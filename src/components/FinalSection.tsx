"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const LOVE_LANGUAGES = [
  "I love you", "Je t’aime", "Te amo", "Ich liebe dich",
  "أحبك", "Seni seviyorum", "Aishiteru", "Ti amo"
];

export default function FinalSection() {
    const [langIndex, setLangIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLangIndex((prev) => (prev + 1) % LOVE_LANGUAGES.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 relative overflow-hidden bg-white/50 backdrop-blur-sm">
            <h2 className="text-4xl font-serif text-romantic-900 mb-4 z-10">
                You are my favorite notification.
            </h2>
             <h3 className="text-3xl text-romantic-700 mb-4 z-10">My favorite person.</h3>
             <h3 className="text-3xl text-romantic-600 mb-12 z-10">My favorite everything.</h3>

             <div className="relative w-80 h-80 md:w-96 md:h-96 mb-8 rounded-full overflow-hidden border-8 border-white shadow-2xl mx-auto animate-pulse-slow">
                 <Image
                   src="/misc/hands.jpeg"
                   alt="Holding hands"
                   fill
                   className="object-cover object-bottom"
                 />
             </div>

             <motion.div
               className="text-romantic-600 mb-12"
               animate={{ scale: [1, 1.08, 1] }}
               transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
             >
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
             </motion.div>

             <motion.div
                key={langIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-4xl font-serif text-romantic-800 h-10 mb-20"
             >
                {LOVE_LANGUAGES[langIndex]}
             </motion.div>

             <div className="absolute bottom-8 text-sm text-romantic-400 font-sans">
                Made with ❤️ from wajo
             </div>
        </div>
    );
}
