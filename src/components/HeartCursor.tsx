"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeartCursor() {
  const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorXY({ x: e.clientX, y: e.clientY });
    };
    const mouseDown = () => setClicked(true);
    const mouseUp = () => setClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center text-red-500 drop-shadow-[0_0_10px_rgba(255,105,180,0.5)]"
      animate={{
        x: cursorXY.x - 16,
        y: cursorXY.y - 16,
        scale: clicked ? 0.8 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      ❤️
    </motion.div>
  );
}
