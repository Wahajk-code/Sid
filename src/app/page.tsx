"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CatchHeartGame from "@/components/CatchHeartGame";
import LoveMeter from "@/components/LoveMeter";
import MemeSection from "@/components/MemeSection";
import CounterSection from "@/components/CounterSection";
import FinalSection from "@/components/FinalSection";
import IntroCard from "@/components/IntroCard";
import HiddenSecrets from "@/components/HiddenSecrets";

import ValentineGame from "@/components/ValentineGame";
import SlideshowSection from "@/components/SlideshowSection";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [gameStage, setGameStage] = useState<'catch' | 'ask' | 'unlocked'>('catch');
  const section2Ref = useRef<HTMLDivElement>(null);

  const handleCatchWin = () => {
    setGameStage('ask');
  };

  const handleUnlock = () => {
    setGameStage('unlocked');
    setTimeout(() => {
      section2Ref.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  const isLocked = gameStage !== 'unlocked';

  return (
    <main className="relative min-h-screen">
       <HiddenSecrets />
       {showIntro && <IntroCard onDismiss={() => setShowIntro(false)} />}

       {/* SECTION 1: Game Sequence */}
       <section className="min-h-screen relative z-30 bg-romantic-50">
          <AnimatePresence mode="wait">
            {gameStage === 'catch' && (
               <motion.div key="catch" exit={{ opacity: 0 }} className="absolute inset-0">
                  <CatchHeartGame onComplete={handleCatchWin} />
               </motion.div>
            )}
            {gameStage === 'ask' && (
               <motion.div key="ask" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                  <ValentineGame onComplete={handleUnlock} />
               </motion.div>
            )}
          </AnimatePresence>
          {/* Keep ValentineGame visible if unlocked (or hide it? User probably wants to scroll past it) 
              Actually, if unlocked, we probably want to show the ValentineGame in its "Won" state or just hide it. 
              The original ValentineGame doesn't have a persistent "Won" state UI, it just calls onComplete.
              Let's keep it mounted if unlocked but maybe it scrolls away. 
              Wait, if we unmount it, the 'Yes' confetti might cut off. 
              But the 'page' content is below. 
              Let's just hide the game section or keep 'ask' visible but pointer-events-none?
              Simpler: If unlocked, maybe we just show the "You've stolen my heart" message or similar. 
              Let's stick to the 'ask' component staying there but maybe we show a success message? 
              ValentineGame handles its own success UI? 
              Checking ValentineGame: it calls onComplete but stays rendered. 
              So we can keep rendering it if gameStage === 'unlocked' too? 
              Let's try just keeping it for 'ask' AND 'unlocked'.
          */}
           {(gameStage === 'ask' || gameStage === 'unlocked') && (
               <ValentineGame onComplete={handleUnlock} />
           )}
       </section>

       {/* CONTENT SECTIONS (Revealed after unlock) */}
       <div className={`${isLocked ? "fixed inset-0 overflow-hidden pointer-events-none opacity-0" : "opacity-100 transition-opacity duration-1000"}`}>
            {/* SECTION 2: Love Meter */}
            <section ref={section2Ref} className="min-h-screen z-20 relative">
               <LoveMeter start={!isLocked} />
            </section>

            {/* SECTION 3: Meme */}
            <section className="min-h-screen z-20 relative">
               <MemeSection />
            </section>

            {/* SECTION 4: Counter */}
            <section className="min-h-[60vh] z-20 relative">
               <CounterSection />
            </section>
            


            {/* SECTION 5: Slideshow */}
            <section className="min-h-screen z-20 relative">
               <SlideshowSection />
            </section>
            
            {/* SECTION 6: Final */}
            <section className="min-h-screen z-20 relative">
               <FinalSection />
            </section>
       </div>
    </main>
  );
}
