export interface Flower {
  id: string;
  name: string;
  symbol: string;
  lore: string;
  funFact: string;
  themeColor: string; // Tailwind color class or hex for text/accent
  glowColor: string; // Shadow glow color (hex)
}

export const flowers: Flower[] = [
  {
    id: "rose",
    name: "Crimson Rose",
    symbol: "🌹",
    lore: "Ancient myths say the rose was created by Chloris, the goddess of flowers, who breathed life into a woodland nymph. Aphrodite, the goddess of love, gave her beauty, while Dionysus gave her a sweet nectar perfume. It has since become the universal messenger of silent, deep love.",
    funFact: "Roses are actually closely related to apples, cherries, peaches, and plums! That explains why their scent is so sweet.",
    themeColor: "from-pink-500 to-rose-700",
    glowColor: "rgba(244, 114, 182, 0.4)",
  },
  {
    id: "sunflower",
    name: "Golden Sunflower",
    symbol: "🌻",
    lore: "Sunflowers trace back to Greek mythology, where they represent loyalty and constancy. Clytie, a water nymph, fell so deeply in love with Apollo, the sun god, that she watched his chariot cross the sky every day until she took root in the earth and became a sunflower, forever turning her face to follow her beloved.",
    funFact: "Young sunflowers perform 'heliotropism'—they track the sun from east to west every day, then turn back east at night to wait for the sunrise!",
    themeColor: "from-amber-400 to-yellow-600",
    glowColor: "rgba(251, 191, 36, 0.4)",
  },
  {
    id: "tulip",
    name: "Blushing Tulip",
    symbol: "🌷",
    lore: "In Persian folklore, red tulips were born from the tears of Farhad, a young man who was devastated by the loss of his love, Shirin. Every drop of his tears that hit the ground sprouted a red tulip, cementing it as a symbol of eternal, perfect, and selfless love.",
    funFact: "In 17th-century Holland, tulips were so valuable that they cost more than actual houses! This period was called 'Tulip Mania'.",
    themeColor: "from-rose-400 to-pink-600",
    glowColor: "rgba(244, 63, 94, 0.4)",
  },
  {
    id: "hibiscus",
    name: "Tropical Hibiscus",
    symbol: "🌺",
    lore: "In many cultures, the hibiscus represents delicate beauty, unity, and outstanding beauty. Giving a red hibiscus represents a passionate, sudden love that blooms rapidly and vibrates with life.",
    funFact: "Hibiscus flowers are completely edible and are often made into a tangy, vitamin-C rich herbal tea that has a natural deep red color.",
    themeColor: "from-red-400 to-rose-600",
    glowColor: "rgba(244, 63, 94, 0.4)",
  },
  {
    id: "lavender",
    name: "Serene Lavender",
    symbol: "🪻",
    lore: "Historically associated with purity and cleanliness, lavender was strewn on the floors of medieval castles to ward off evil and bring tranquility. In the language of flowers, it represents calm, devotion, and silent grace, whispering that peace lies wherever you go.",
    funFact: "Lavender is a natural stress reliever! Just smelling its essential oil can lower your heart rate and ease anxiety.",
    themeColor: "from-purple-400 to-indigo-600",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    id: "lily",
    name: "Angelic Lily",
    symbol: "🌸",
    lore: "In Greek mythology, the lily sprouted from the milk of Hera, the queen of the gods, representing motherhood, purity, and rebirth. In many cultures, giving a lily signifies that you hold the recipient in the highest esteem and devotion.",
    funFact: "Lilies are incredibly resilient and have been found depicted in wall paintings from the Minoan civilization dating back to 1580 BCE!",
    themeColor: "from-pink-300 to-rose-400",
    glowColor: "rgba(244, 114, 182, 0.3)",
  },
  {
    id: "cherry_blossom",
    name: "Sakura Blossom",
    symbol: "🌸",
    lore: "In Japanese tradition, the cherry blossom (Sakura) represents the transient beauty of life. Because they bloom all at once in breathtaking splendor and then gently fall away, they remind us to cherish every single moment of love and beauty.",
    funFact: "The peak bloom of cherry blossoms only lasts for about a week, making their viewing (Hanami) a highly anticipated and magical event each spring.",
    themeColor: "from-pink-300 to-pink-500",
    glowColor: "rgba(244, 114, 182, 0.4)",
  },
  {
    id: "orchid",
    name: "Exotic Orchid",
    symbol: "🌺",
    lore: "In Victorian England, orchids were rare, exotic treasures given only as tokens of the deepest affection. They represent rare and delicate beauty, strength, and a love that is uniquely refined and enduring.",
    funFact: "Orchids have the largest family of flowering plants on Earth, with over 25,000 species—that's more than double the number of bird species!",
    themeColor: "from-purple-500 to-fuchsia-600",
    glowColor: "rgba(217, 70, 239, 0.4)",
  },
  {
    id: "lotus",
    name: "Mystic Lotus",
    symbol: "🪷",
    lore: "The lotus root is anchored in deep mud, yet it grows upward through murky water to bloom pristine and beautiful in the sunlight. It represents purity of heart, spiritual awakening, and rising above obstacles together.",
    funFact: "Lotus seeds have a remarkable lifespan! Scientists have successfully sprouted lotus seeds that were over 1,300 years old.",
    themeColor: "from-teal-400 to-emerald-600",
    glowColor: "rgba(45, 212, 191, 0.4)",
  },
  {
    id: "daffodil",
    name: "Dawning Daffodil",
    symbol: "🌼",
    lore: "As one of the first flowers to bloom after winter, daffodils represent rebirth, optimism, and the warm sunshine of spring. Giving someone daffodils is a message that they are the sunshine that chases away your winter.",
    funFact: "Daffodils are the national flower of Wales, and if you spot the first daffodil of the season there, it is said to bring you wealth and good fortune for the year!",
    themeColor: "from-yellow-400 to-orange-500",
    glowColor: "rgba(250, 204, 21, 0.4)",
  },
];

export const taglines: string[] = [
  "If you were a flower, I'd pick you every single time. 🌸",
  "Are you a daisy? Because I'm crazy for you. 🌼",
  "You bloom my mind. 💖",
  "Our love is like a flower—always growing more beautiful. 🌷",
  "I'm tulip-ly in love with you. 💕",
  "You rose to the occasion and stole my heart. 🌹",
  "What in carnation? You're too gorgeous. ✨",
  "If I had a flower for every time I thought of you, I'd walk in my garden forever. 🌺",
  "You make my heart skip a beat, and my soul sprout wings. 🌱",
  "You're my favorite blossom in the whole wide world. 🌸",
  "Every day with you is like a walk in a blooming paradise. 🌈",
  "My love for you grows wilder every day. 🌿",
  "You're daisy-ngly beautiful. 🌼",
  "Aloe you vera much! 🌱",
  "Thistle be a beautiful day because of you. 💜",
  "I can't orchid-state how much you mean to me. 🌺",
  "I love you bunch-es! 💐",
  "You're my pollen-tary alignment. 🌟",
  "I'm not lion, you're as lovely as a dandelion. 🦁🌼",
  "You're blossom-ing into the most wonderful part of my day. 💞",
];

export function getFlowerOfTheDay(): Flower {
  const today = new Date();
  // We use local date string to create a stable hash for the day
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = dateString.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % flowers.length;
  return flowers[index];
}

export function getRandomTagline(currentIndex?: number): { text: string; index: number } {
  let index = Math.floor(Math.random() * taglines.length);
  if (currentIndex !== undefined && taglines.length > 1) {
    while (index === currentIndex) {
      index = Math.floor(Math.random() * taglines.length);
    }
  }
  return { text: taglines[index], index };
}
