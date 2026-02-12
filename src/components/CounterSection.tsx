"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const startDate = new Date("2025-10-01"); // "31st Sept" rolls over to Oct 1st

export default function CounterSection() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-romantic-50">
       <h2 className="text-3xl md:text-5xl font-serif text-romantic-900 mb-12 text-center">
         Time with you has been my favorite journey.
       </h2>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {Object.entries(time).map(([label, value]) => (
            <motion.div
               key={label}
               initial={{ scale: 0.9, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               className="glass-card p-6 w-32 md:w-40 flex flex-col items-center justify-center"
            >
               <span className="text-4xl md:text-5xl font-bold text-romantic-600 block mb-2">
                 {value}
               </span>
               <span className="text-sm font-bold tracking-widest uppercase text-romantic-400">
                 {label}
               </span>
            </motion.div>
          ))}
       </div>

       <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         className="mt-12 text-xl text-romantic-800"
       >
         And I would choose you again <span className="underline decoration-wavy decoration-romantic-400">every single day</span>.
       </motion.div>
    </div>
  );
}
