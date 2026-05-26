import { motion } from 'motion/react';

interface SorryTranslation {
  id: string;
  text: string;
  language: string;
  left: string; // percentage absolute left
  top: string;  // percentage absolute top
  delay: number;
  rotation: number;
  scale: number;
  flourishType: 'loop' | 'wave' | 'swirl' | 'dots' | 'sparkle';
}

const TRANSLATIONS: SorryTranslation[] = [
  // Left side of the screen
  { id: '1', text: 'माफ़ करना', language: 'Hindi', left: '10%', top: '22%', delay: 0.1, rotation: -2, scale: 0.95, flourishType: 'loop' },
  { id: '2', text: 'ਮਾਫ਼ ਕਰਨਾ', language: 'Punjabi', left: '6%', top: '38%', delay: 0.3, rotation: 3, scale: 0.95, flourishType: 'swirl' },
  { id: '3', text: 'క్షమించండి', language: 'Telugu', left: '5%', top: '56%', delay: 0.5, rotation: -1, scale: 0.9, flourishType: 'dots' },
  { id: '4', text: 'மன்னிக்கவும்', language: 'Tamil', left: '9%', top: '72%', delay: 0.7, rotation: 2, scale: 0.9, flourishType: 'wave' },
  { id: '5', text: 'माफ़ करा', language: 'Marathi', left: '22%', top: '15%', delay: 0.9, rotation: -3, scale: 0.95, flourishType: 'sparkle' },

  // Right side of the screen
  { id: '6', text: 'মাফ করবেন', language: 'Bengali', left: '78%', top: '22%', delay: 0.2, rotation: 3, scale: 0.95, flourishType: 'loop' },
  { id: '7', text: 'માફ કરિદે', language: 'Gujarati', left: '82%', top: '38%', delay: 0.4, rotation: -2, scale: 0.95, flourishType: 'swirl' },
  { id: '8', text: 'ಕ್ಷಮಿಸಿ', language: 'Kannada', left: '83%', top: '56%', delay: 0.6, rotation: 1, scale: 0.9, flourishType: 'dots' },
  { id: '9', text: 'മാപ്പ് ചെയ്യണേ', language: 'Malayalam', left: '79%', top: '72%', delay: 0.8, rotation: -2, scale: 0.9, flourishType: 'wave' },
  { id: '10', text: 'ਮਾਫ਼ ਕਰਨਾ', language: 'Punjabi - Gurmukhi', left: '66%', top: '15%', delay: 1.0, rotation: 2, scale: 0.95, flourishType: 'sparkle' }
];

interface LanguageCloudsProps {
  isForgiven: boolean;
}

export default function LanguageClouds({ isForgiven }: LanguageCloudsProps) {
  if (isForgiven) return null; // Hide apology clouds on success!

  // Vector flourish renderer based on type
  const renderFlourish = (type: string) => {
    switch (type) {
      case 'loop':
        return (
          <svg viewBox="0 0 50 12" className="w-12 h-3 text-blue-400/40 select-none" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M 2 6 Q 25 -3 48 6 M 12 7 Q 25 12 38 7" strokeLinecap="round" />
          </svg>
        );
      case 'wave':
        return (
          <svg viewBox="0 0 50 12" className="w-12 h-3 text-blue-400/40 select-none" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M 3 6 C 15 2, 20 10, 32 6 C 38 4, 42 6, 47 6" strokeLinecap="round" />
            <circle cx="25" cy="9" r="1" fill="currentColor" />
          </svg>
        );
      case 'swirl':
        return (
          <svg viewBox="0 0 50 12" className="w-12 h-3 text-blue-400/35 select-none" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M 5 6 Q 15 1 25 6 T 45 6" strokeLinecap="round" />
            <path d="M 40 3 Q 45 6 40 9" strokeLinecap="round" />
          </svg>
        );
      case 'dots':
        return (
          <svg viewBox="0 0 50 12" className="w-12 h-3 text-blue-400/30 select-none" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M 8 6 Q 25 3 42 6" strokeDasharray="3,3" strokeLinecap="round" />
            <circle cx="25" cy="5" r="1.5" fill="currentColor" opacity="0.7" />
          </svg>
        );
      case 'sparkle':
        return (
          <svg viewBox="0 0 50 12" className="w-12 h-3 text-blue-400/40 select-none" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M 12 6 Q 25 4 38 6" strokeLinecap="round" />
            <path d="M 25 1 L 26 4 L 29 5 L 26 6 L 25 9 L 24 6 L 21 5 L 24 4 Z" fill="currentColor" opacity="0.6" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      {TRANSLATIONS.map((item) => (
        <motion.div
          key={item.id}
          className="absolute flex flex-col items-center select-none"
          style={{
            left: item.left,
            top: item.top,
            transformOrigin: 'center center',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.85,
            scale: item.scale,
            // Majestic screen-wide drifting floating motion (moves everywhere around)
            x: [0, 20, -15, 25, -20, 0],
            y: [0, -35, 20, -45, 30, 0],
            rotate: [item.rotation, item.rotation + 4, item.rotation - 4, item.rotation + 3, item.rotation],
          }}
          transition={{
            opacity: { duration: 0.8, delay: item.delay },
            scale: { duration: 0.8, delay: item.delay, type: 'spring', stiffness: 100 },
            x: {
              duration: 14 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            y: {
              duration: 15 + Math.random() * 8,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }}
        >
          {/* Main regional translation text */}
          <span className="font-fredoka text-base sm:text-lg md:text-xl font-bold text-blue-800/90 select-none tracking-wide text-center drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            {item.text}
          </span>
          
          {/* Smaller, muted language label */}
          <span className="font-poppins text-[9px] sm:text-[10px] text-blue-500/60 font-semibold select-none mt-0.5 tracking-wider uppercase">
            ({item.language})
          </span>

          {/* Cute SVG hand-drawn underline accent */}
          <div className="mt-0.5">
            {renderFlourish(item.flourishType)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
