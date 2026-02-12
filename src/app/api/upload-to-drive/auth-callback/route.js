import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { google } from "googleapis";

// Paths for credentials & token storage
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const TOKEN_PATH = path.join(process.cwd(), "token.json");

// Use environment variables (fallbacks if missing)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://form.visionpme.ca";
const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "fr";

// Redirect URI must match the one registered in Google Cloud Console
const REDIRECT_URI = `${BASE_URL}/${DEFAULT_LOCALE}/api/upload-to-drive/auth-callback`;

function getOAuth2Client() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  const { client_secret, client_id } = credentials.web || credentials.installed;
  return new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code not provided" },
        { status: 400 }
      );
    }

    const oAuth2Client = getOAuth2Client();

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

    // ✅ Redirect to correct locale video-upload page
    return NextResponse.redirect(
      `${BASE_URL}/${DEFAULT_LOCALE}/video-upload?auth=success`
    );
  } catch (error) {
    console.error("Error during authentication callback:", error);
    return NextResponse.redirect(
      `${BASE_URL}/${DEFAULT_LOCALE}/video-upload?auth=error&message=` +
        encodeURIComponent(error.message)
    );
  }
}
