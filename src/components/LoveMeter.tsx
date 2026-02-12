"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function LoveMeter({ start = false }: { start?: boolean }) {
  const [progress, setProgress] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [showInfinity, setShowInfinity] = useState(false);

  useEffect(() => {
    if (inView && start) {
      const milestones = [30, 75, 100, 120, 300, 999];
      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep < milestones.length) {
          setProgress(milestones[currentStep]);
          currentStep++;
        } else {
          clearInterval(interval);
          setShowInfinity(true);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [inView, start]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col items-center justify-center p-8 bg-romantic-100">
      <h2 className="text-3xl font-serif text-romantic-900 mb-8 text-center">
        How much do I love you?
      </h2>
      
      <div className="w-full max-w-2xl bg-white rounded-full h-8 overflow-hidden relative shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-romantic-300 to-romantic-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: showInfinity ? "100%" : `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-bold text-romantic-800 z-10">
          {showInfinity ? (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              className="text-2xl"
            >
              ∞ There is no limit
            </motion.span>
          ) : (
            <span>{progress}%</span>
          )}
        </div>
      </div>
      
      {showInfinity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-xl text-romantic-700 italic">&quot;My love for you grows endlessly.&quot;</p>
        </motion.div>
      )}
    </div>
  );
}
