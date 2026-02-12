"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function IntroCard({ onDismiss }: { onDismiss: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 500); // Wait for exit animation
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative bg-white p-8 rounded-3xl max-w-md w-full text-center shadow-2xl border-4 border-romantic-300 transform-gpu"
            onClick={(e) => e.stopPropagation()} // Prevent clicking outside closing immediately
          >
            <h1 className="text-4xl font-serif text-romantic-900 mb-6 font-bold">
              Bonjour fair maiden
            </h1>

            <div className="relative flex items-center justify-center">
                {/* Bouquet */}
                <motion.div
                    initial={{ x: -100, opacity: 0, rotate: -45 }}
                    animate={{ x: -20, opacity: 1, rotate: -15 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute left-0 -ml-4 z-20 text-[5rem] drop-shadow-xl filter"
                >
                    💐
                </motion.div>

                {/* Main Image */}
                <motion.div
                     whileHover={{ scale: 1.05, rotate: 2 }}
                     className="relative w-64 h-64 border-4 border-romantic-200 rounded-2xl overflow-hidden shadow-lg bg-romantic-50"
                >
                    <Image
                        src="/Gemini_Generated_Image_oy4ysqoy4ysqoy4y-removebg-preview.png"
                        alt="Fair Maiden"
                        fill
                        className="object-cover"
                    />
                </motion.div>
                
                 {/* Sparkles */}
                 <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-6 -right-6 text-4xl"
                >
                    ✨
                </motion.div>
            </div>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDismiss}
                className="mt-8 bg-romantic-500 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-romantic-600 transition-colors"
            >
                Open 💌
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
