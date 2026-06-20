"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, BookOpen, Sparkles } from "lucide-react";
import { Flower } from "@/lib/flowers";

interface LoreModalProps {
  flower: Flower;
}

export default function LoreModal({ flower }: LoreModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Info Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/70 hover:bg-white/90 text-romantic-600 hover:text-romantic-800 p-4 rounded-full shadow-lg border border-romantic-200/50 backdrop-blur-md transition-colors group cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Reveal flower lore and fun facts"
      >
        <HelpCircle size={26} className="animate-pulse" />
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-romantic-950 text-white px-3 py-1 rounded-lg text-sm font-sans font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
          Reveal Lore 🌸
        </span>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-romantic-950/40 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white/80 border border-white/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl max-h-[85vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-romantic-500 hover:text-romantic-800 hover:bg-romantic-100/50 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Decorative Accent Glow */}
              <div
                className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ backgroundColor: flower.glowColor || "rgba(244,114,182,0.4)" }}
              />

              <div className="overflow-y-auto pr-2 custom-scrollbar space-y-6">
                {/* Header */}
                <div className="text-center pb-4 border-b border-romantic-100/60">
                  <div className="text-5xl mb-3 animate-bounce">{flower.symbol}</div>
                  <h2 className="text-3xl font-serif font-bold bg-gradient-to-r bg-clip-text text-transparent from-romantic-800 to-romantic-950">
                    {flower.name}
                  </h2>
                  <p className="text-xs tracking-widest text-romantic-500 uppercase font-sans mt-1">
                    Flower of the Day
                  </p>
                </div>

                {/* Lore Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-romantic-700 font-serif font-semibold text-lg">
                    <BookOpen size={18} className="text-romantic-500" />
                    <span>The Lore & Symbolism</span>
                  </div>
                  <p className="text-romantic-600 leading-relaxed font-sans italic bg-romantic-50/40 p-4 rounded-2xl border border-romantic-100/30">
                    "{flower.lore}"
                  </p>
                </div>

                {/* Fun Fact Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-romantic-700 font-serif font-semibold text-lg">
                    <Sparkles size={18} className="text-yellow-500" />
                    <span>Botanical Fun Fact</span>
                  </div>
                  <p className="text-romantic-700 leading-relaxed font-sans bg-amber-50/30 p-4 rounded-2xl border border-amber-100/30">
                    {flower.funFact}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 mt-4 border-t border-romantic-100/60 text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-gradient-to-r from-romantic-500 to-rose-500 text-white rounded-full font-sans font-medium shadow-md hover:shadow-lg transition-shadow duration-300 hover:from-romantic-600 hover:to-rose-600 cursor-pointer"
                >
                  Close & Adore 💖
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
