"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import canvasConfetti from "canvas-confetti";

interface Heart {
  id: number;
  x: number;
  y: number;
  speed: number;
}

export default function CatchHeartGame({ onComplete }: { onComplete: () => void }) {
  const [basketX, setBasketX] = useState(50);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const basketXRef = useRef(50);
  const requestRef = useRef<number | null>(null);

  // Mouse/Touch Movement
  useEffect(() => {
    const updateBasket = (clientX: number) => {
      if (!containerRef.current) return;
      const { left, width } = containerRef.current.getBoundingClientRect();
      const x = ((clientX - left) / width) * 100;
      const clamped = Math.max(5, Math.min(95, x));
      setBasketX(clamped);
      basketXRef.current = clamped;
    };

    const handleMouseMove = (e: MouseEvent) => updateBasket(e.clientX);
    const handleTouchMove = (e: TouchEvent) => updateBasket(e.touches[0].clientX);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Game Logic Loop
  useEffect(() => {
    if (gameWon) return;

    let lastTime = Date.now();
    let spawnTimer = 0;

    const loop = () => {
      const now = Date.now();
      const dt = now - lastTime;
      lastTime = now;

      // Spawn hearts every 800ms
      spawnTimer += dt;
      if (spawnTimer > 800) {
        setHearts(prev => [
          ...prev, 
          { id: now, x: Math.random() * 90 + 5, y: -10, speed: 0.3 + Math.random() * 0.2 } // Speed in % per ms? No, let's do simpler.
        ]);
        spawnTimer = 0;
      }

      setHearts(prev => {
        const next: Heart[] = [];
        let newScore = -1; // Flag

        prev.forEach(h => {
          // Move heart
          h.y += h.speed * (dt / 5); // adjusting speed

          // Check collision
          const isAtBasketHeight = h.y > 85 && h.y < 95;
          const isAligned = Math.abs(h.x - basketXRef.current) < 10;

          if (isAtBasketHeight && isAligned) {
            newScore = 1; // Mark hit
            // Don't add to next (remove it)
          } else if (h.y < 105) {
            next.push(h);
          }
        });

        if (newScore > 0) {
           setScore(s => {
             const newS = s + 1;
             if (newS >= 7) setGameWon(true);
             return newS;
           });
        }
        return next;
      });

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, [gameWon]);

  // Win Effect
  useEffect(() => {
    if (gameWon) {
       canvasConfetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ff69b4", "#ff1493", "#ffe4e1"],
        });
        
        // Side cannons "flowers" logic reused
        const end = Date.now() + 3000;
        const colors = ["#ff69b4", "#ff1493", "#ffe4e1", "#ff0000"];
        (function frame() {
          canvasConfetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors });
          canvasConfetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors });
          if (Date.now() < end) requestAnimationFrame(frame);
        })();

        setTimeout(onComplete, 2000);
    }
  }, [gameWon, onComplete]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-romantic-50 cursor-crosshair touch-none select-none">
       {/* Instructions */}
       <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
          {gameWon ? (
             <motion.div 
               initial={{ scale: 0 }} 
               animate={{ scale: 1 }} 
               className="text-4xl md:text-6xl font-serif font-bold text-romantic-600"
             >
               You&rsquo;ve officially stolen my heart.
             </motion.div>
          ) : (
             <>
                <h2 className="text-2xl font-serif text-romantic-800">Catch 7 Hearts!</h2>
                <p className="text-4xl font-bold text-romantic-500 mt-2">{score} / 7</p>
             </>
          )}
       </div>

       {/* Hearts */}
       {hearts.map(h => (
         <div 
           key={h.id}
           className="absolute text-3xl"
           style={{ left: `${h.x}%`, top: `${h.y}%` }}
         >
            ❤️
         </div>
       ))}

       {/* Basket */}
       <div 
         className="absolute bottom-10 text-8xl transform -translate-x-1/2 transition-transform duration-75 ease-linear"
         style={{ left: `${basketX}%` }}
       >
         🧺
       </div>
    </div>
  );
}
