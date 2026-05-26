import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FloatingHearts from './components/FloatingHearts';
import ApologyCard from './components/ApologyCard';
import LanguageClouds from './components/LanguageClouds';

interface ClickedHeart {
  id: string;
  x: number;
  y: number;
  size: number;
}

interface TwinkleStar {
  id: string;
  left: number;
  top: number;
  size: number;
  delay: number;
}

export default function App() {
  const [isForgiven, setIsForgiven] = useState(false);
  const [noClicksCount, setNoClicksCount] = useState(0);
  const [extraHearts, setExtraHearts] = useState<ClickedHeart[]>([]);

  // Capture screen clicks to dynamically spawn cute cyan hearts for physical feedback
  const handleScreenClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Check if click was on a button or link to avoid interference
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button') || target.tagName === 'A' || target.closest('a')) {
      return;
    }

    const newHeart: ClickedHeart = {
      id: `heart-${Date.now()}-${Math.random()}`,
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 22 + 16, // random size between 16px and 38px
    };

    setExtraHearts((prev) => [...prev, newHeart]);
  }, []);

  // Soft cleanup of extra hearts to avoid memory growth
  useEffect(() => {
    if (extraHearts.length === 0) return;
    const timer = setTimeout(() => {
      setExtraHearts((prev) => prev.slice(1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [extraHearts]);

  const handleForgive = useCallback(() => {
    setIsForgiven(true);
  }, []);

  const handleNoClick = useCallback(() => {
    setNoClicksCount((prev) => prev + 1);
  }, []);

  // Pre-generate a set of twinkling star particles for the background sky
  const stars: TwinkleStar[] = useMemo(() => {
    const list: TwinkleStar[] = [];
    for (let i = 0; i < 24; i++) {
      list.push({
        id: `star-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 95,
        size: Math.random() * 8 + 6,
        delay: Math.random() * 3,
      });
    }
    return list;
  }, []);

  return (
    <div
      onClick={handleScreenClick}
      className="relative min-h-screen w-full bg-radial-[at_50%_40%] from-[#EFF6FF] via-[#bae6fd] to-[#7dd3fc] flex flex-col justify-between items-center py-6 select-none overflow-hidden"
    >
      {/* Background Floating Hearts Engine */}
      <FloatingHearts isForgiven={isForgiven} extraHearts={extraHearts} />

      {/* Full-screen Apology Translation Clouds */}
      <LanguageClouds isForgiven={isForgiven} />

      {/* Decorative Twinkling Stars (Reference Background Style) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
            }}
          >
            <svg viewBox="0 0 10 10" className="w-full h-full text-white/80">
              <path d="M 5 0 L 6.2 3.8 L 10 5 L 6.2 6.2 L 5 10 L 3.8 6.2 L 0 5 L 3.8 3.8 Z" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>

      {/* LEFT HANGING CORNER DECOR (Swinging Cords with Glossy Blue Hearts) */}
      <div className="absolute top-0 left-0 w-36 h-64 pointer-events-none z-10 hidden sm:block">
        {/* Hanging String 1 */}
        <div className="absolute top-0 left-6 flex flex-col items-center animate-swing">
          <div className="w-[1.2px] h-20 bg-blue-300/40 border-l border-dashed border-blue-200/50" />
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-sky-400 drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)]" fill="url(#hangingGlossyHeart)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <path d="M 7.5 4.5 C 6.2 4.5 5 5.8 5 7.2 C 5 8.5 6.5 10 7.5 10.5" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.65" strokeLinecap="round" />
          </svg>
        </div>
        {/* Hanging String 2 */}
        <div className="absolute top-0 left-16 flex flex-col items-center animate-swing-delayed">
          <div className="w-[1.2px] h-32 bg-blue-300/40 border-l border-dashed border-blue-200/50" />
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-sky-400 drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)]" fill="url(#hangingGlossyHeart)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <path d="M 7.5 4.5 C 6.2 4.5 5 5.8 5 7.2 C 5 8.5 6.5 10 7.5 10.5" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.65" strokeLinecap="round" />
          </svg>
        </div>
        {/* Hanging String 3 */}
        <div className="absolute top-0 left-28 flex flex-col items-center animate-swing">
          <div className="w-[1.2px] h-12 bg-blue-300/40 border-l border-dashed border-blue-200/50" />
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-sky-400 drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)]" fill="url(#hangingGlossyHeart)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <path d="M 7.5 4.5 C 6.2 4.5 5 5.8 5 7.2 C 5 8.5 6.5 10 7.5 10.5" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.65" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* RIGHT HANGING CORNER DECOR (Swinging Cords with Glossy Blue Hearts) */}
      <div className="absolute top-0 right-0 w-36 h-64 pointer-events-none z-10 hidden sm:block">
        {/* Hanging String 1 */}
        <div className="absolute top-0 right-6 flex flex-col items-center animate-swing-delayed">
          <div className="w-[1.2px] h-24 bg-blue-300/40 border-l border-dashed border-blue-200/50" />
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-sky-400 drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)]" fill="url(#hangingGlossyHeart)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <path d="M 7.5 4.5 C 6.2 4.5 5 5.8 5 7.2 C 5 8.5 6.5 10 7.5 10.5" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.65" strokeLinecap="round" />
          </svg>
        </div>
        {/* Hanging String 2 */}
        <div className="absolute top-0 right-16 flex flex-col items-center animate-swing">
          <div className="w-[1.2px] h-36 bg-blue-300/40 border-l border-dashed border-blue-200/50" />
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-sky-400 drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)]" fill="url(#hangingGlossyHeart)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <path d="M 7.5 4.5 C 6.2 4.5 5 5.8 5 7.2 C 5 8.5 6.5 10 7.5 10.5" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.65" strokeLinecap="round" />
          </svg>
        </div>
        {/* Hanging String 3 */}
        <div className="absolute top-0 right-28 flex flex-col items-center animate-swing-delayed">
          <div className="w-[1.2px] h-16 bg-blue-300/40 border-l border-dashed border-blue-200/50" />
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-sky-400 drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)]" fill="url(#hangingGlossyHeart)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <path d="M 7.5 4.5 C 6.2 4.5 5 5.8 5 7.2 C 5 8.5 6.5 10 7.5 10.5" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.65" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Shared Gradient for Hanging Hearts */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <linearGradient id="hangingGlossyHeart" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="35%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>



      {/* Main Apology Interactive Card Section */}
      <main className="w-full flex-grow flex items-center justify-center z-10 relative">
        <ApologyCard
          isForgiven={isForgiven}
          onForgive={handleForgive}
          noClicksCount={noClicksCount}
          onNoClick={handleNoClick}
        />
      </main>

      {/* Footer / Credits */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.2 }}
        className="text-center text-[11px] text-blue-600/60 font-poppins font-semibold mt-4 z-10 pointer-events-none px-4"
      >
        Made with love for Naaikutty 🩵
      </motion.footer>
    </div>
  );
}
