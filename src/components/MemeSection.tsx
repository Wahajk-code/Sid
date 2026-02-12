"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MemeSection() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white relative overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
           whileHover={{ scale: 1.05, rotateY: 10, rotateX: 10 }}
           className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-2xl glass-card border-4 border-romantic-200"
        >
            <Image
              src="/jaun.jpg"
              alt="Meme"
              fill
              className="object-contain"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </motion.div>

        <div className="text-center md:text-left flex flex-col items-center md:items-start">
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="relative flex items-baseline gap-4"
           >
              <h2 className="text-[8rem] md:text-[10rem] leading-none font-black text-romantic-900">
                E
              </h2>
              <h2 className="text-[6rem] md:text-[8rem] leading-none font-black text-romantic-600">
                MAN
              </h2>
           </motion.div>
           <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="text-2xl mt-8 text-romantic-700 font-serif italic"
           >
             &quot;You will always be my Jaun-e-man&quot;
           </motion.p>
        </div>
      </div>
    </div>
  );
}
