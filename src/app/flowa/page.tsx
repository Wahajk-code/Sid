"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, Heart } from "lucide-react";
import Link from "next/link";
import { getFlowerOfTheDay, getRandomTagline, Flower } from "@/lib/flowers";
import FlowerRenderer from "@/components/FlowerRenderer";
import LoreModal from "@/components/LoreModal";

interface Petal {
  id: number;
  x: number;
  driftX: number;
  duration: number;
  delay: number;
  rotateEnd: number;
  scale: number;
}

export default function FlowaPage() {
  const [flower, setFlower] = useState<Flower | null>(null);
  const [tagline, setTagline] = useState<{ text: string; index: number }>({ text: "", index: -1 });
  const [petals, setPetals] = useState<Petal[]>([]);
  const [isRotating, setIsRotating] = useState(false);

  // Initialize client-side data to prevent hydration mismatch
  useEffect(() => {
    setFlower(getFlowerOfTheDay());
    setTagline(getRandomTagline());

    // Generate falling petals
    const generatedPetals = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of screen width
      driftX: Math.random() * 150 - 75, // pixels
      duration: Math.random() * 8 + 6, // seconds
      delay: Math.random() * -10, // negative delay so they start pre-distributed
      rotateEnd: Math.random() * 360 + 360, // degrees
      scale: Math.random() * 0.6 + 0.4,
    }));
    setPetals(generatedPetals);
  }, []);

  const handleRefreshTagline = () => {
    if (isRotating) return;
    setIsRotating(true);
    setTagline((prev) => getRandomTagline(prev.index));
    setTimeout(() => setIsRotating(false), 600);
  };

  if (!flower) {
    return (
      <div className="flex h-screen items-center justify-center bg-romantic-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-romantic-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-between py-8 px-4 bg-gradient-to-b from-romantic-50 via-romantic-100/40 to-white">
      {/* Falling Petals Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {petals.map((petal) => (
          <motion.svg
            key={petal.id}
            viewBox="0 0 20 20"
            className="absolute top-0 w-5 h-5 fill-rose-300/40"
            style={{
              left: `${petal.x}%`,
              scale: petal.scale,
            }}
            animate={{
              y: ["-10vh", "110vh"],
              x: [0, petal.driftX],
              rotate: [0, petal.rotateEnd],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay,
            }}
          >
            <path d="M 10,0 C 20,0 25,10 20,20 C 15,25 5,25 0,20 C -5,15 0,0 10,0 Z" />
          </motion.svg>
        ))}
      </div>

      {/* Header / Intro */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center z-10 space-y-2 mt-4"
      >
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-romantic-800 tracking-tight">
          here, my jaun a flowa for you.
        </h1>
        <p className="text-romantic-600 font-sans text-sm sm:text-base font-medium max-w-xs sm:max-w-md mx-auto">
          a flowa a day keeps the begum happy
        </p>
      </motion.div>

      {/* Flower & Hand Centerpiece */}
      <div className="relative w-[320px] h-[400px] flex items-center justify-center z-10 my-4">
        {/* Hand Offering */}
        <motion.div
          initial={{ y: 250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 40, damping: 12, delay: 0.4 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[260px] z-10"
        >
          <svg viewBox="0 0 250 300" className="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="handSkin" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#fbcfe8" />
                <stop offset="100%" stopColor="#ffe4e6" />
              </linearGradient>
            </defs>
            {/* Detailed Hand Silhouette offering upwards */}
            <path
              d="M 60,300 
                 C 60,240 70,200 80,160 
                 C 70,140 60,110 75,90 
                 C 85,80 95,100 98,120 
                 C 98,90 95,50 108,45 
                 C 118,40 122,70 122,110 
                 C 122,80 125,35 138,30 
                 C 148,25 152,60 152,110 
                 C 152,80 158,45 168,40 
                 C 178,35 180,70 178,120 
                 C 178,95 188,70 195,70 
                 C 202,70 202,95 195,130 
                 C 190,170 180,240 180,300 Z"
              fill="url(#handSkin)"
              stroke="#f472b6"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Palm crease details for realism */}
            <path d="M 98,160 C 110,170 130,170 145,155" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M 115,185 C 125,190 145,185 155,170" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Flower Growing from Hand Palm */}
        {/* Palm center maps to approx bottom-0 of flower, aligned at bottom-[145px] */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 40, damping: 10, delay: 1.0 }}
          className="absolute bottom-[140px] left-1/2 -translate-x-1/2 w-[180px] h-[252px] z-20 pointer-events-none origin-bottom"
        >
          <FlowerRenderer flowerId={flower.id} />
        </motion.div>
      </div>

      {/* Interactive Tagline Bubble */}
      <div className="z-10 w-full max-w-md px-4 mt-2 mb-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
          className="w-full bg-white/70 border border-white/60 p-4 sm:p-5 rounded-2xl shadow-lg backdrop-blur-md flex items-center justify-between gap-4 group"
        >
          <div className="flex-1 min-h-[44px] flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={tagline.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-romantic-800 font-sans font-medium text-base sm:text-lg italic"
              >
                {tagline.text}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={handleRefreshTagline}
            className="p-2.5 rounded-xl bg-romantic-100 hover:bg-romantic-200 text-romantic-600 hover:text-romantic-800 transition-colors shadow-sm focus:outline-none cursor-pointer flex-shrink-0"
            title="Get a new cute line"
          >
            <RotateCw
              size={18}
              className={`transition-transform duration-500 ${isRotating ? "rotate-180" : ""}`}
            />
          </button>
        </motion.div>
      </div>

      {/* Secret Side Hover Tab to Valentine's Card */}
      <div className="fixed left-0 top-[40%] z-45 transform -translate-x-[calc(100%-48px)] hover:translate-x-0 transition-transform duration-300 ease-out">
        <Link
          href="/valentine"
          className="flex items-center gap-3 pl-4 pr-5 py-3 bg-white/80 hover:bg-white border border-l-0 border-romantic-200/50 shadow-lg rounded-r-2xl backdrop-blur-md text-romantic-600 hover:text-romantic-800 font-sans font-bold transition-colors duration-300 group"
        >
          <Heart size={20} className="fill-romantic-400 text-romantic-500 animate-pulse group-hover:scale-110 transition-transform" />
          <span className="whitespace-nowrap text-sm">
            Valentine's Day Card 🌸
          </span>
        </Link>
      </div>

      {/* Info Modal Trigger and Overlay */}
      <LoreModal flower={flower} />
    </main>
  );
}
