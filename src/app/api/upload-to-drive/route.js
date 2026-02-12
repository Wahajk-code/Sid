import { google } from "googleapis";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Configure Google Drive
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const REDIRECT_URI =
  "https://form.visionpme.ca/api/upload-to-drive/auth-callback";

// Helper function to get OAuth2 client
function getOAuth2Client() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      "Credentials file not found. Please add credentials.json to your project root."
    );
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  const { client_secret, client_id } = credentials.web || credentials.installed;

  return new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);
}

// Helper function to refresh token
async function refreshToken(oAuth2Client) {
  try {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
    oAuth2Client.setCredentials(token);

    if (token.refresh_token) {
      const { credentials: newToken } = await oAuth2Client.refreshAccessToken();
      oAuth2Client.setCredentials(newToken);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(newToken, null, 2));
      console.log("Token refreshed successfully at", new Date().toISOString());
    } else {
      console.error("No refresh token available");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
}

// Start token refresh interval for testing (every 3 minutes)
let refreshInterval = null;
function startTokenRefreshInterval() {
  if (refreshInterval) {
    clearInterval(refreshInterval); // Clear any existing interval
  }
  const oAuth2Client = getOAuth2Client();
  refreshInterval = setInterval(() => {
    refreshToken(oAuth2Client);
  }, 30 * 60 * 1000); // 30 minutes in milliseconds
}

// Helper function to authenticate with Google Drive using OAuth
async function authenticateGoogleDrive() {
  try {
    const oAuth2Client = getOAuth2Client();

    // Check if we have previously stored a token
    if (fs.existsSync(TOKEN_PATH)) {
      const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
      oAuth2Client.setCredentials(token);

      // Start token refresh interval for testing
      startTokenRefreshInterval();

      // Check if token is expired and refresh it
      if (token.expiry_date && Date.now() > token.expiry_date) {
        try {
          const { credentials: newToken } =
            await oAuth2Client.refreshAccessToken();
          oAuth2Client.setCredentials(newToken);

          // Save the new token
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(newToken, null, 2));
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          // Token refresh failed, need to re-authenticate
          throw new Error("Authentication required. Token refresh failed.");
        }
      }
    } else {
      throw new Error("Authentication required. No token found.");
    }

    return google.drive({ version: "v3", auth: oAuth2Client });
  } catch (error) {
    console.error("Error authenticating with Google Drive:", error);
    throw new Error(
      "Failed to authenticate with Google Drive: " + error.message
    );
  }
}

export async function POST(request) {
  try {
    // Check authentication first
    try {
      await authenticateGoogleDrive();
    } catch {
      return NextResponse.json(
        { error: "Authentication required", authRequired: true },
        { status: 401 }
      );
    }

    // Parse the form data
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "Invalid file type. Only video files are allowed." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create temp directory if it doesn't exist
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Save file to temporary location
    const tempFilePath = path.join(tempDir, file.name);
    fs.writeFileSync(tempFilePath, buffer);

    // Authenticate with Google Drive
    const drive = await authenticateGoogleDrive();

    // Prepare the file for upload
    const fileMetadata = {
      name: file.name,
      parents: [GOOGLE_DRIVE_FOLDER_ID],
    };

    const media = {
      mimeType: file.type,
      body: fs.createReadStream(tempFilePath),
    };

    // Upload the file to Google Drive
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    // Return success response
    return NextResponse.json({
      status: "success",
      fileId: response.data.id,
      message: "File uploaded to Google Drive successfully",
    });
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);

    return NextResponse.json(
      { error: error.message || "Failed to upload file to Google Drive" },
      { status: 500 }
    );
  }
}

// Handle all GET requests
export async function GET(request) {
  const url = new URL(request.url);

  // Handle authentication callback
  if (url.pathname === "/api/upload-to-drive/auth-callback") {
    try {
      const code = url.searchParams.get("code");

      if (!code) {
        return NextResponse.json(
          { error: "Authorization code not provided" },
          { status: 400 }
        );
      }

      const oAuth2Client = getOAuth2Client();

      // Exchange code for tokens
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);

      // Save tokens to file for later use
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

      // Start token refresh interval after successful authentication
      startTokenRefreshInterval();

      // Redirect to success page
      return NextResponse.redirect(
        "https://form.visionpme.ca/fr/video-upload?auth=success"
      );
    } catch (error) {
      console.error("Error during authentication callback:", error);
      return NextResponse.redirect(
        "https://form.visionpme.ca/fr/video-upload?auth=error&message=" +
          encodeURIComponent(error.message)
      );
    }
  }

  // Handle authentication initialization
  if (url.searchParams.get("action") === "init-auth") {
    try {
      const oAuth2Client = getOAuth2Client();

      // Generate authentication URL
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent",
        redirect_uri: REDIRECT_URI,
      });

      return NextResponse.json({ authUrl });
    } catch (error) {
      console.error("Error generating auth URL:", error);
      return NextResponse.json(
        { error: "Failed to generate authentication URL" },
        { status: 500 }
      );
    }
  }

  // Handle authentication status check
  if (url.searchParams.get("action") === "check-auth") {
    try {
      if (!fs.existsSync(TOKEN_PATH)) {
        return NextResponse.json({
          authenticated: false,
          error: "Not authenticated",
        });
      }

      const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
      const isExpired = token.expiry_date && Date.now() > token.expiry_date;

      if (isExpired) {
        try {
          const oAuth2Client = getOAuth2Client();
          oAuth2Client.setCredentials(token);

          // Refresh access token
          const { credentials: newToken } =
            await oAuth2Client.refreshAccessToken();
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(newToken, null, 2));

          // Start token refresh interval after refreshing
          startTokenRefreshInterval();

          return NextResponse.json({
            authenticated: true,
            expired: false,
          });
        } catch (err) {
          console.error("Token refresh failed:", err);
          return NextResponse.json({
            authenticated: false,
            expired: true,
            error: "Token expired, re-authentication required",
          });
        }
      }

      // Start token refresh interval if not already running
      startTokenRefreshInterval();

      return NextResponse.json({
        authenticated: true,
        expired: false,
      });
    } catch (error) {
      console.error("Error checking auth status:", error);
      return NextResponse.json({ authenticated: false, error: error.message });
    }
  }

  // Default response for other GET requests
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
