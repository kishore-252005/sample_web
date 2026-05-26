import { useMemo } from 'react';
import { motion } from 'motion/react';
import { FloatingHeart } from '../types';

interface FloatingHeartsProps {
  isForgiven: boolean;
  extraHearts: { id: string; x: number; y: number; size: number }[];
}

export default function FloatingHearts({ isForgiven, extraHearts }: FloatingHeartsProps) {
  // Generate a set of static-definition looping hearts to keep CPU light and smooth
  const ambientHearts = useMemo(() => {
    const list: FloatingHeart[] = [];
    const count = isForgiven ? 35 : 20; // More celebration hearts if forgiven!
    for (let i = 0; i < count; i++) {
      list.push({
        id: `ambient-${i}`,
        x: Math.random() * 100, // random percent width
        size: Math.random() * 24 + (isForgiven ? 15 : 10), // size in px
        speed: Math.random() * 8 + (isForgiven ? 4 : 8), // seconds to float up (faster if forgiven)
        delay: Math.random() * 8, // staggered entrance
        scale: Math.random() * 0.5 + 0.6,
      });
    }
    return list;
  }, [isForgiven]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient Looping Hearts */}
      {ambientHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-sky-300/40 dark:text-sky-300/30"
          style={{
            left: `${heart.x}%`,
            width: heart.size,
            height: heart.size,
          }}
          initial={{ y: '105vh', scale: 0, opacity: 0 }}
          animate={{
            y: '-10vh',
            scale: [0, heart.scale, heart.scale, 0],
            opacity: [0, 0.7, 0.7, 0],
            x: [0, Math.sin(heart.x) * 20, -Math.sin(heart.x) * 20, 0],
          }}
          transition={{
            duration: heart.speed,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full text-sky-200"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </motion.div>
      ))}

      {/* Interactive custom spawned hearts clicked by user */}
      {extraHearts.map((eh) => (
        <motion.div
          key={eh.id}
          className="absolute text-cyan-300/80"
          style={{
            left: eh.x,
            top: eh.y,
            width: eh.size,
            height: eh.size,
          }}
          initial={{ scale: 0, opacity: 1, y: 0 }}
          animate={{
            scale: [0.2, 1.4, 1.4, 0],
            opacity: [1, 0.9, 0],
            y: -150,
            x: [0, (Math.random() - 0.5) * 60],
          }}
          transition={{
            duration: 1.8,
            ease: 'easeOut',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full text-cyan-300"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
