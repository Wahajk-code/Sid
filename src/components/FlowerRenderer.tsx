"use client";

import { motion } from "framer-motion";

interface FlowerRendererProps {
  flowerId: string;
}

export default function FlowerRenderer({ flowerId }: FlowerRendererProps) {
  // Common animation variants
  const stemVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.8, ease: "easeInOut" as const, delay: 1.2 },
    },
  };

  const leafVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.2 + 0.8 + custom * 0.3,
        type: "spring" as const,
        stiffness: 90,
        damping: 10,
      },
    }),
  };

  const headVariants = {
    hidden: { scale: 0, rotate: -35, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        delay: 1.2 + 1.6,
        type: "spring" as const,
        stiffness: 70,
        damping: 12,
      },
    },
  };

  const petalVariants = (index: number) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.2 + 1.8 + index * 0.05,
        type: "spring" as const,
        stiffness: 80,
        damping: 10,
      },
    },
  });

  const renderFlowerSVG = () => {
    switch (flowerId) {
      case "rose":
        return (
          <>
            {/* Stem */}
            <motion.path
              d="M 100,280 C 95,220 105,160 100,105"
              fill="none"
              stroke="#15803d"
              strokeWidth="6"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Thorny details */}
            <motion.path
              d="M 97,200 L 90,195 M 103,160 L 110,155 M 98,130 L 92,125"
              stroke="#15803d"
              strokeWidth="3"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Leaves */}
            <motion.path
              d="M 98,190 C 70,180 55,210 98,205"
              fill="#22c55e"
              stroke="#16a34a"
              strokeWidth="1.5"
              custom={1}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M 102,150 C 130,140 145,170 102,165"
              fill="#22c55e"
              stroke="#16a34a"
              strokeWidth="1.5"
              custom={2}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Rose Flower Head */}
            <motion.g
              variants={headVariants}
              initial="hidden"
              animate="visible"
              className="origin-[100px_105px]"
            >
              {/* Outer Petals */}
              <path d="M 100,105 C 50,65 70,25 100,45 C 130,25 150,65 100,105 Z" fill="url(#roseGradOuter)" />
              <path d="M 100,105 C 50,115 50,65 100,75 C 150,65 150,115 100,105 Z" fill="url(#roseGradMid)" />
              <path d="M 100,105 C 65,135 135,135 100,105 Z" fill="url(#roseGradMid)" />
              {/* Middle Layer */}
              <circle cx="100" cy="85" r="24" fill="url(#roseGradInner)" />
              {/* Inner Swirl Petals */}
              <path d="M 100,85 C 88,75 88,95 100,95 C 112,95 112,75 100,85 Z" fill="#9d174d" />
              <path d="M 100,85 C 93,78 107,78 100,85 Z" fill="#f43f5e" />
            </motion.g>
          </>
        );

      case "sunflower":
        return (
          <>
            {/* Stem */}
            <motion.path
              d="M 100,280 C 100,220 100,160 100,100"
              fill="none"
              stroke="#16a34a"
              strokeWidth="7"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Leaves */}
            <motion.path
              d="M 100,200 C 60,190 50,230 100,225"
              fill="#15803d"
              stroke="#14532d"
              strokeWidth="2"
              custom={1}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M 100,150 C 140,140 150,180 100,175"
              fill="#15803d"
              stroke="#14532d"
              strokeWidth="2"
              custom={2}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Flower Head */}
            <motion.g
              variants={headVariants}
              initial="hidden"
              animate="visible"
              className="origin-[100px_100px]"
            >
              {/* Radiating Yellow Petals */}
              {Array.from({ length: 16 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 22.5}, 100, 100)`}>
                  <motion.path
                    d="M 100,100 C 92,70 100,40 108,70 Z"
                    fill="url(#sunflowerPetalGrad)"
                    stroke="#eab308"
                    strokeWidth="0.5"
                    style={{ originX: 0.5, originY: 1.0 }}
                    custom={i}
                    variants={petalVariants(i % 4)}
                    initial="hidden"
                    animate="visible"
                  />
                </g>
              ))}
              {/* Inner Brown Seed Center */}
              <circle cx="100" cy="100" r="26" fill="url(#sunflowerCenterGrad)" stroke="#451a03" strokeWidth="2" />
              {/* Texture Details */}
              <circle cx="100" cy="100" r="18" fill="none" stroke="#7c2d12" strokeWidth="2" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="10" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
            </motion.g>
          </>
        );

      case "tulip":
        return (
          <>
            {/* Stem */}
            <motion.path
              d="M 100,280 C 105,210 95,150 100,110"
              fill="none"
              stroke="#16a34a"
              strokeWidth="6"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Long pointed leaves */}
            <motion.path
              d="M 100,240 C 70,220 80,140 98,170"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="2"
              custom={1}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M 100,210 C 130,190 120,110 102,140"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="2"
              custom={2}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Flower Head */}
            <motion.g
              variants={headVariants}
              initial="hidden"
              animate="visible"
              className="origin-[100px_110px]"
            >
              {/* Back Petal */}
              <path d="M 100,110 C 80,90 80,50 100,40 C 120,50 120,90 100,110 Z" fill="url(#tulipBackGrad)" />
              {/* Left Petal */}
              <path d="M 100,110 C 70,110 65,65 92,50 C 96,75 96,95 100,110 Z" fill="url(#tulipFrontGrad)" />
              {/* Right Petal */}
              <path d="M 100,110 C 130,110 135,65 108,50 C 104,75 104,95 100,110 Z" fill="url(#tulipFrontGrad)" />
            </motion.g>
          </>
        );

      case "hibiscus":
        return (
          <>
            {/* Stem */}
            <motion.path
              d="M 100,280 C 97,220 103,160 100,110"
              fill="none"
              stroke="#15803d"
              strokeWidth="5.5"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Leaves */}
            <motion.path
              d="M 98,200 C 70,195 65,220 98,215"
              fill="#16a34a"
              stroke="#14532d"
              strokeWidth="1"
              custom={1}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M 102,170 C 130,165 135,190 102,185"
              fill="#16a34a"
              stroke="#14532d"
              strokeWidth="1"
              custom={2}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Flower Head */}
            <motion.g
              variants={headVariants}
              initial="hidden"
              animate="visible"
              className="origin-[100px_110px]"
            >
              {/* 5 Large Overlapping Hibiscus Petals */}
              {Array.from({ length: 5 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 72}, 100, 110)`}>
                  <motion.path
                    d="M 100,110 C 65,80 72,45 100,50 C 128,45 135,80 100,110 Z"
                    fill="url(#hibiscusPetalGrad)"
                    stroke="#db2777"
                    strokeWidth="0.5"
                    style={{ originX: 0.5, originY: 1.0 }}
                    custom={i}
                    variants={petalVariants(i)}
                    initial="hidden"
                    animate="visible"
                  />
                </g>
              ))}

              {/* Long Stamen Column extending up-right */}
              <motion.path
                d="M 100,110 Q 115,85 125,65"
                fill="none"
                stroke="#facc15"
                strokeWidth="4"
                strokeLinecap="round"
              />
              
              {/* Little stamen tips / anthers */}
              <circle cx="125" cy="65" r="3" fill="#ea580c" />
              <circle cx="121" cy="62" r="2.5" fill="#facc15" />
              <circle cx="127" cy="69" r="2.5" fill="#facc15" />
              <circle cx="118" cy="70" r="2" fill="#facc15" />
              <circle cx="128" cy="61" r="2" fill="#facc15" />
            </motion.g>
          </>
        );

      case "lavender":
        return (
          <>
            {/* Stem */}
            <motion.path
              d="M 100,280 C 100,200 100,150 100,75"
              fill="none"
              stroke="#16a34a"
              strokeWidth="4"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Needle-like leaves */}
            <motion.path
              d="M 100,240 Q 80,230 75,210 Q 90,225 100,235"
              fill="#15803d"
              custom={1}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M 100,210 Q 120,200 125,180 Q 110,195 100,205"
              fill="#15803d"
              custom={2}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Lavender flower buds spiraling up */}
            <motion.g
              variants={headVariants}
              initial="hidden"
              animate="visible"
            >
              {[150, 135, 120, 105, 90, 75, 60].map((y, index) => {
                const scale = 1 - (150 - y) * 0.003;
                return (
                  <g key={y} style={{ transform: `scale(${scale})`, transformOrigin: `100px ${y}px` }}>
                    {/* Left bud */}
                    <g key={`l-${y}`} transform={`rotate(-25, 100, ${y})`}>
                      <motion.ellipse
                        cx="92"
                        cy={y}
                        rx="7"
                        ry="4"
                        fill="url(#lavenderGrad)"
                        style={{ originX: 0.5, originY: 0.5 }}
                        custom={index}
                        variants={petalVariants(index)}
                        initial="hidden"
                        animate="visible"
                      />
                    </g>
                    {/* Right bud */}
                    <g key={`r-${y}`} transform={`rotate(25, 100, ${y})`}>
                      <motion.ellipse
                        cx="108"
                        cy={y}
                        rx="7"
                        ry="4"
                        fill="url(#lavenderGrad)"
                        style={{ originX: 0.5, originY: 0.5 }}
                        custom={index + 1}
                        variants={petalVariants(index)}
                        initial="hidden"
                        animate="visible"
                      />
                    </g>
                    {/* Top/Center bud */}
                    <motion.ellipse
                      cx="100"
                      cy={y - 5}
                      rx="5"
                      ry="7"
                      fill="url(#lavenderGradInner)"
                      style={{ originX: 0.5, originY: 0.5 }}
                      custom={index + 2}
                      variants={petalVariants(index)}
                      initial="hidden"
                      animate="visible"
                    />
                  </g>
                );
              })}
            </motion.g>
          </>
        );

      case "lily":
        return (
          <>
            {/* Stem */}
            <motion.path
              d="M 100,280 C 97,220 103,160 100,110"
              fill="none"
              stroke="#15803d"
              strokeWidth="5"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Leaves */}
            <motion.path
              d="M 98,210 C 70,200 75,225 98,225"
              fill="#22c55e"
              custom={1}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M 102,170 C 130,160 125,185 102,185"
              fill="#22c55e"
              custom={2}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Lily Flower Head */}
            <motion.g
              variants={headVariants}
              initial="hidden"
              animate="visible"
              className="origin-[100px_110px]"
            >
              {/* Petals */}
              {Array.from({ length: 6 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 60}, 100, 110)`}>
                  <motion.path
                    d="M 100,110 C 75,95 80,45 100,30 C 120,45 125,95 100,110 Z"
                    fill="url(#lilyPetalGrad)"
                    stroke="#fecdd3"
                    strokeWidth="0.5"
                    style={{ originX: 0.5, originY: 1.0 }}
                    custom={i}
                    variants={petalVariants(i % 3)}
                    initial="hidden"
                    animate="visible"
                  />
                </g>
              ))}
              {/* Delicate Pistil and Stamens */}
              <path d="M 100,110 L 90,80 M 100,110 L 100,75 M 100,110 L 110,80" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              <circle cx="90" cy="80" r="3.5" fill="#facc15" />
              <circle cx="100" cy="75" r="3.5" fill="#facc15" />
              <circle cx="110" cy="80" r="3.5" fill="#facc15" />
            </motion.g>
          </>
        );

      case "cherry_blossom":
        return (
          <>
            {/* Stem/Twig */}
            <motion.path
              d="M 100,280 C 95,210 110,165 100,115"
              fill="none"
              stroke="#7c2d12"
              strokeWidth="5"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Flower Head */}
            <motion.g
              variants={headVariants}
              initial="hidden"
              animate="visible"
              className="origin-[100px_115px]"
            >
              {/* 5 Notched Petals */}
              {Array.from({ length: 5 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 72}, 100, 115)`}>
                  <motion.path
                    d="M 100,115 C 80,95 82,65 100,75 C 118,65 120,95 100,115 Z"
                    fill="url(#cherryPetalGrad)"
                    stroke="#fda4af"
                    strokeWidth="0.5"
                    style={{ originX: 0.5, originY: 1.0 }}
                    custom={i}
                    variants={petalVariants(i)}
                    initial="hidden"
                    animate="visible"
                  />
                </g>
              ))}
              {/* Center Stamen spray */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="115"
                  x2={100 + Math.sin((i * 36 * Math.PI) / 180) * 15}
                  y2={115 + Math.cos((i * 36 * Math.PI) / 180) * 15}
                  stroke="#db2777"
                  strokeWidth="1"
                  opacity="0.8"
                />
              ))}
              <circle cx="100" cy="115" r="4.5" fill="#f43f5e" />
            </motion.g>
          </>
        );

      case "orchid":
        return (
          <>
            {/* Stem */}
            <motion.path
              d="M 100,280 C 90,200 110,150 100,110"
              fill="none"
              stroke="#15803d"
              strokeWidth="4.5"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Flower Head */}
            <motion.g
              variants={headVariants}
              initial="hidden"
              animate="visible"
              className="origin-[100px_110px]"
            >
              {/* Top Petal */}
              <path d="M 100,110 C 80,60 120,60 100,110 Z" fill="url(#orchidGradPink)" stroke="#e879f9" strokeWidth="0.5" />
              {/* 2 Large Wings */}
              <path d="M 100,110 C 50,90 40,125 100,130 Z" fill="url(#orchidGradWing)" stroke="#f472b6" strokeWidth="0.5" />
              <path d="M 100,110 C 150,90 160,125 100,130 Z" fill="url(#orchidGradWing)" stroke="#f472b6" strokeWidth="0.5" />
              {/* 2 Lower Petals */}
              <path d="M 100,110 C 70,140 90,165 100,135 Z" fill="url(#orchidGradPink)" opacity="0.9" />
              <path d="M 100,110 C 130,140 110,165 100,135 Z" fill="url(#orchidGradPink)" opacity="0.9" />
              {/* Central Labellum (Lip) */}
              <path d="M 100,120 C 85,120 95,145 100,138 C 105,145 115,120 100,120 Z" fill="url(#orchidCenterGrad)" />
              {/* Golden central node */}
              <circle cx="100" cy="118" r="4.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            </motion.g>
          </>
        );

      case "lotus":
        return (
          <>
            {/* Stem */}
            <motion.path
              d="M 100,280 C 100,220 100,170 100,125"
              fill="none"
              stroke="#0f766e"
              strokeWidth="5"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Large circular floating base leaf */}
            <motion.path
              d="M 100,270 C 40,265 40,295 100,290 C 160,295 160,265 100,270 Z"
              fill="#065f46"
              stroke="#047857"
              strokeWidth="1.5"
              custom={1}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Flower Head */}
            <motion.g
              variants={headVariants}
              initial="hidden"
              animate="visible"
              className="origin-[100px_125px]"
            >
              {/* Back Petals */}
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 45}, 100, 125)`}>
                  <motion.path
                    d="M 100,125 C 70,105 85,55 100,65 C 115,55 130,105 100,125 Z"
                    fill="url(#lotusOuterGrad)"
                    stroke="#f9a8d4"
                    strokeWidth="0.5"
                    style={{ originX: 0.5, originY: 1.0 }}
                    custom={i}
                    variants={petalVariants(i % 3)}
                    initial="hidden"
                    animate="visible"
                  />
                </g>
              ))}
              {/* Inner Petals forming a cup */}
              <path d="M 100,125 C 65,115 70,75 100,85 C 130,75 135,115 100,125 Z" fill="url(#lotusInnerGrad)" />
              <path d="M 100,125 C 75,125 80,95 100,100 C 120,95 125,125 100,125 Z" fill="#f472b6" opacity="0.9" />
              {/* Yellow center node */}
              <circle cx="100" cy="115" r="7.5" fill="#eab308" />
            </motion.g>
          </>
        );

      case "daffodil":
        return (
          <>
            {/* Stem */}
            <motion.path
              d="M 100,280 C 102,210 98,150 100,110"
              fill="none"
              stroke="#15803d"
              strokeWidth="5"
              strokeLinecap="round"
              variants={stemVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Strappy vertical leaves */}
            <motion.path
              d="M 98,240 C 70,190 80,110 92,120"
              fill="#16a34a"
              custom={1}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M 102,220 C 130,170 120,90 108,105"
              fill="#16a34a"
              custom={2}
              variants={leafVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Flower Head */}
            <motion.g
              variants={headVariants}
              initial="hidden"
              animate="visible"
              className="origin-[100px_110px]"
            >
              {/* 6 Pale Yellow Petals */}
              {Array.from({ length: 6 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 60}, 100, 110)`}>
                  <motion.path
                    d="M 100,110 C 75,95 80,60 100,65 C 120,60 125,95 100,110 Z"
                    fill="url(#daffodilPetalGrad)"
                    stroke="#fef08a"
                    strokeWidth="0.5"
                    style={{ originX: 0.5, originY: 1.0 }}
                    custom={i}
                    variants={petalVariants(i % 3)}
                    initial="hidden"
                    animate="visible"
                  />
                </g>
              ))}
              {/* Central Corona (Trumpet) */}
              <ellipse cx="100" cy="110" rx="14" ry="14" fill="url(#daffodilTrumpetGrad)" stroke="#ea580c" strokeWidth="1.5" />
              <path d="M 90,105 C 93,98 97,98 100,98 C 103,98 107,98 110,105" fill="none" stroke="#ea580c" strokeWidth="1.5" />
              <circle cx="100" cy="110" r="5" fill="#ca8a04" />
            </motion.g>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <svg width="200" height="280" viewBox="0 0 200 280" className="w-full h-full drop-shadow-lg">
      <defs>
        {/* Rose Gradients */}
        <radialGradient id="roseGradOuter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#be185d" />
        </radialGradient>
        <radialGradient id="roseGradMid" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="70%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9d174d" />
        </radialGradient>
        <radialGradient id="roseGradInner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe4e6" />
          <stop offset="60%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#be185d" />
        </radialGradient>

        {/* Sunflower Gradients */}
        <linearGradient id="sunflowerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>
        <radialGradient id="sunflowerCenterGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1c1917" />
          <stop offset="70%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>

        {/* Tulip Gradients */}
        <linearGradient id="tulipBackGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#be185d" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="tulipFrontGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="70%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#fbcfe8" />
        </linearGradient>

        {/* Daisy Gradients */}
        <linearGradient id="daisyPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="85%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffe4e6" />
        </linearGradient>
        <radialGradient id="daisyCenterGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="75%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>

        {/* Lavender Gradients */}
        <linearGradient id="lavenderGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="60%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
        <linearGradient id="lavenderGradInner" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#ddd6fe" />
        </linearGradient>

        {/* Lily Gradients */}
        <linearGradient id="lilyPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="35%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#fff1f2" />
        </linearGradient>

        {/* Cherry Blossom Gradients */}
        <radialGradient id="cherryPetalGrad" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="85%" stopColor="#fce7f3" />
          <stop offset="100%" stopColor="#ffe4e6" />
        </radialGradient>

        {/* Orchid Gradients */}
        <linearGradient id="orchidGradPink" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="orchidGradWing" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#d946ef" />
          <stop offset="50%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#fae8ff" />
        </linearGradient>
        <radialGradient id="orchidCenterGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="60%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#701a75" />
        </radialGradient>

        {/* Lotus Gradients */}
        <linearGradient id="lotusOuterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="70%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#fdf2f8" />
        </linearGradient>
        <linearGradient id="lotusInnerGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#fbcfe8" />
        </linearGradient>

        {/* Daffodil Gradients */}
        <linearGradient id="daffodilPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="60%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#fef9c3" />
        </linearGradient>
        <linearGradient id="daffodilTrumpetGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="80%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>

        {/* Hibiscus Gradients */}
        <linearGradient id="hibiscusPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>

      <motion.g inherit={false} initial="hidden" animate="visible">
        {renderFlowerSVG()}
      </motion.g>
    </svg>
  );
}
