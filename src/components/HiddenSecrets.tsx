"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function HiddenSecrets() {
  const [secretsFound, setSecretsFound] = useState([false, false, false]);
  const [showMessage, setShowMessage] = useState(false);

  // Timeout effect for the secret message
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 6000); // 6 seconds timeout
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const handleFound = (index: number) => {
    if (secretsFound[index]) return;
    const newSecrets = [...secretsFound];
    newSecrets[index] = true;
    setSecretsFound(newSecrets);

    if (newSecrets.every(Boolean)) {
        setTimeout(() => setShowMessage(true), 1000);
    }
  };

  const messages = ["You found the secret 😌", "You’re curious… I like that.", "Okay fine… I love you more."];

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {/* Corner 1: Top Left */}
        <motion.button
           className="absolute top-0 left-0 w-8 h-8 bg-romantic-300 rounded-br-full pointer-events-auto cursor-pointer hover:w-12 hover:h-12 transition-all opacity-20 hover:opacity-100"
           onClick={() => handleFound(0)}
           whileTap={{ scale: 0.9 }}
        >
            {secretsFound[0] && <span className="absolute top-1 left-1 text-xs">✨</span>}
        </motion.button>

        {/* Corner 2: Bottom Right */}
        <motion.button
           className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-romantic-200 pointer-events-auto cursor-pointer flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity"
            onClick={() => handleFound(1)}
        >
           <span className="text-xs">❤️</span>
        </motion.button>
        
        {/* Corner 3: Top Right */}
        <motion.button
           className="absolute top-0 right-0 w-4 h-4 bg-yellow-200 shadow-[0_0_10px_yellow] rounded-full pointer-events-auto cursor-pointer opacity-40 hover:opacity-100"
           onClick={() => handleFound(2)}
        />
      </div>
      
      {/* Toast Messages for Secrets */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
         <AnimatePresence>
            {secretsFound.map((found, i) => found && (
                <motion.div
                    key={i}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-white/80 backdrop-blur border text-sm border-romantic-200 p-2 rounded shadow-lg text-romantic-800"
                >
                    {messages[i]}
                </motion.div>
            ))}
         </AnimatePresence>
      </div>

      <AnimatePresence>
        {showMessage && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center text-center p-8"
            >
                <div className="text-white space-y-6">
                    <h2 className="text-4xl font-serif">You found all my secrets.</h2>
                    <p className="text-2xl font-light">That&rsquo;s why I&rsquo;m marrying you.</p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
