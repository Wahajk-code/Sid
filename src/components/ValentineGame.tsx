"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import canvasConfetti from "canvas-confetti";

export default function ValentineGame({ onComplete }: { onComplete: () => void }) {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const handleNoHover = () => {
    setAttempts((prev) => prev + 1);
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  const handleYesClick = () => {
    // Center burst
    canvasConfetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff69b4", "#ff1493", "#ffe4e1"],
    });

    // Side cannons "flowers" effect
    const end = Date.now() + 3000;
    const colors = ["#ff69b4", "#ff1493", "#ffe4e1", "#ff0000"];

    (function frame() {
      canvasConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      canvasConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    onComplete();
  };

  const noTexts = [
    "No 😏",
    "Are you sure?",
    "Think again 👀",
    "Destiny awaits",
    "Broken button 😌",
    "Okay fine...",
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8 bg-romantic-50 text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 max-w-lg w-full"
      >
        <h1 className="text-4xl font-serif text-romantic-800 mb-6">
          Before you continue... <br /> You must complete this mission 😌
        </h1>
        <p className="text-xl text-romantic-600 mb-8 font-sans">
          Will you be my Valentine?
        </p>

        <div className="flex items-center justify-center gap-6 relative h-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleYesClick}
            className="bg-romantic-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:bg-romantic-600 transition shadow-lg"
          >
            YES 💖
          </motion.button>

          <AnimatePresence>
            {attempts < 5 && (
              <motion.button
                key="no-button"
                onMouseEnter={handleNoHover}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                exit={{ opacity: 0, scale: 0 }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full text-lg font-medium absolute right-0"
              >
                {noTexts[Math.min(attempts, noTexts.length - 1)]}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
