"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGES = [
  "/misc/WhatsApp Image 2026-02-13 at 1.09.15 AM (1).jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 1.09.15 AM.jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.42 AM.jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.43 AM (1).jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.43 AM.jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.44 AM (1).jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.44 AM (2).jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.44 AM.jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.45 AM (1).jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.45 AM.jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.46 AM (1).jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.46 AM.jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.47 AM.jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.48 AM (1).jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.48 AM.jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.49 AM.jpeg",
  "/misc/WhatsApp Image 2026-02-13 at 12.48.50 AM.jpeg",
];

const CAPTIONS = [
  "My favorite view 😍",
  "Adventures with you ✨",
  "Pure happiness 💖",
  "Look at us! 🥰",
  "Forever & Always ♾️",
  "Best day ever 🌟",
  "So much love 💌",
  "You make me smile 😊",
  "Just us two 💑",
  "Making memories 📸",
  "Heart full of love 💓",
  "Sweetest moments 🍭",
  "My everything 🌎",
  "Love this one! 💕",
  "Can't get enough 😻",
  "Perfect together 🧩",
  "All my love 💘",
  "You are my sunshine ☀️",
  "Better together 🤞",
  "My happy place 🏡",
  "Endless love ❤️",
  "Stuck with me! 😜",
  "My one and only 🥇"
];

export default function SlideshowSection() {
  const [shuffledImages, setShuffledImages] = useState<{ src: string; caption: string }[]>([]);

  useEffect(() => {
    // Fisher-Yates shuffle for better randomness
    const shuffleArray = (array: string[]) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const shuffledImagesList = shuffleArray(IMAGES);
    const shuffledCaptionsList = shuffleArray(CAPTIONS);

    // Guaranteed one-to-one mapping with no repeats (since we have more captions than images)
    const shuffled = shuffledImagesList.map((src, index) => ({
      src,
      caption: shuffledCaptionsList[index],
    }));
    
    setShuffledImages(shuffled);
  }, []);

  return (
    <div className="py-20 px-4 bg-romantic-50 overflow-hidden">
      <h2 className="text-center text-4xl font-serif text-romantic-800 mb-12">
        Moments with You 📸
      </h2>
      
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {shuffledImages.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-rotate-2 hover:scale-105"
          >
            <div className="relative w-64 h-80 rounded-xl overflow-hidden bg-romantic-100">
               <Image
                 src={item.src}
                 alt="Memory"
                 fill
                 className="object-cover transition-transform duration-500 group-hover:scale-110"
               />
            </div>
            <p className="mt-4 text-center font-handwriting text-xl text-romantic-600 font-medium">
              {item.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
