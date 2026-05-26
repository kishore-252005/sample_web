import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TeddyBear from './TeddyBear';

interface ApologyCardProps {
  isForgiven: boolean;
  onForgive: () => void;
  noClicksCount: number;
  onNoClick: () => void;
}

const APOLOGY_MESSAGES = [
  "Will you forgive me, Naaikutty? 🩵",
  "please ma 🥺",
  "please please ma... 😭",
  "I won't do it again, promise! 🤞🩵",
  "Please Naaikutty... 🧸",
  "I'll buy you all your favorite snacks! 🍫✨",
  "My days are dark without your smiles... 🌌",
  "Don't be angry anymore, pretty please? 🙏",
  "Okay, the No button is almost gone! 😉",
  "Ahaha! You have only one option left now! 🤭💕"
];

export default function ApologyCard({
  isForgiven,
  onForgive,
  noClicksCount,
  onNoClick,
}: ApologyCardProps) {

  // Dynamic mobile screen detection for defensive layout scaling
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamic values based on "No" clicks (capped on mobile to prevent layout overflow)
  const maxYesScale = isMobile ? 1.55 : 2.5;
  const yesScale = Math.min(maxYesScale, 1 + noClicksCount * (isMobile ? 0.15 : 0.25));
  
  const noScale = Math.max(0, 1 - noClicksCount * 0.15); // decrease No size until 0
  
  const maxTextScale = isMobile ? 1.25 : 1.7;
  const pleaTextSizeFactor = Math.min(maxTextScale, 1 + noClicksCount * (isMobile ? 0.06 : 0.12));
  
  // Decide what primary prompt message to show
  const currentPrompt = noClicksCount === 0 
    ? "Will you forgive me?" 
    : APOLOGY_MESSAGES[Math.min(noClicksCount, APOLOGY_MESSAGES.length - 1)];

  return (
    <div id="apology-card-root" className="w-full max-w-2xl mx-auto px-4 z-10 relative">
      <AnimatePresence mode="wait">
        {!isForgiven ? (
          <motion.div
            key="apology-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="w-full bg-transparent flex flex-col items-center select-none"
          >
            {/* Beautiful Script "Sorry" Title floating at the top with outer glow (Reference Match) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-2"
            >
              <h1 className="font-cursive text-7xl sm:text-8xl font-bold text-blue-600 drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)] tracking-wide select-none relative">
                Sorry
                {/* Small sparkles around the Sorry title */}
                <span className="absolute -top-1 -left-6 text-xl animate-twinkle opacity-80">✨</span>
                <span className="absolute -bottom-1 -right-6 text-xl animate-twinkle opacity-80" style={{ animationDelay: '1.5s' }}>✨</span>
              </h1>
              {/* Cute underline ribbon */}
              <div className="flex justify-center items-center gap-1.5 mt-0.5 opacity-60">
                <div className="w-6 h-[2px] bg-blue-400 rounded-full" />
                <span className="text-blue-500 text-xs">🩵</span>
                <div className="w-6 h-[2px] bg-blue-400 rounded-full" />
              </div>
            </motion.div>
            
            {/* Centerpiece Container with Teddy Bear */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 my-2 flex items-center justify-center">
              {/* Radial background glow behind bear */}
              <div className="absolute w-56 h-56 bg-sky-200/40 blur-3xl rounded-full -z-10" />
              
              <TeddyBear isForgiven={false} noClicksCount={noClicksCount} />
            </div>

            {/* Will you forgive me? / Plea Prompt Section */}
            <div className="text-center w-full min-h-[90px] flex flex-col justify-center items-center px-4 mb-4 mt-2">
              <motion.div
                key={noClicksCount} // triggers animation on text change
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transform: `scale(${noClicksCount > 0 ? pleaTextSizeFactor : 1})`
                }}
                className="font-fredoka text-blue-700/90 text-center origin-center break-words max-w-full flex items-center justify-center gap-3"
                style={{
                  fontSize: noClicksCount === 0 ? '1.8rem' : '1.4rem',
                  lineHeight: '1.4',
                  fontWeight: noClicksCount === 0 ? '700' : '600',
                  display: 'inline-flex',
                }}
              >
                {/* Left floating heart */}
                <span className="text-blue-400 text-xl animate-bounce select-none">🩵</span>
                
                <span>{currentPrompt}</span>
                
                {/* Right floating heart */}
                <span className="text-blue-400 text-xl animate-bounce select-none" style={{ animationDelay: '0.3s' }}>🩵</span>
              </motion.div>
            </div>

            {/* Buttons Row with premium glossy 3D buttons (Reference Match & Responsive) */}
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full min-h-[120px] px-2 sm:px-4">
              {/* YES BUTTON (Glossy 3D Blue - Responsive padded) */}
              <motion.button
                id="btn-yes"
                onClick={onForgive}
                className="btn-3d-blue flex items-center justify-center gap-1.5 sm:gap-2 text-white font-fredoka font-bold rounded-full py-2.5 px-6 sm:py-3 sm:px-9 text-lg sm:text-2xl cursor-pointer duration-200 select-none"
                style={{
                  transformOrigin: 'center',
                }}
                animate={{
                  scale: yesScale,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 14,
                }}
              >
                <span className="text-lg sm:text-2xl select-none">💙</span> Yes
              </motion.button>

              {/* NO BUTTON (Glossy 3D White - Responsive padded) */}
              {noScale > 0.05 && (
                <motion.button
                  id="btn-no"
                  onClick={onNoClick}
                  className="btn-3d-white text-blue-700/90 font-fredoka font-bold rounded-full py-2.5 px-6 sm:py-3 sm:px-9 text-lg sm:text-2xl cursor-pointer duration-200 select-none"
                  style={{
                    transformOrigin: 'center',
                  }}
                  animate={{
                    scale: noScale,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 160,
                    damping: 12,
                  }}
                  whileHover={{ scale: noScale * 0.96 }}
                >
                  No
                </motion.button>
              )}
            </div>

            {/* Interaction hint */}
            <div className="mt-2 text-[11px] text-blue-500/50 font-medium">
              Psst.. tap anywhere on the screen for a surprise! ✨
            </div>
          </motion.div>
        ) : (
          /* THANK YOU VIEW */
          <motion.div
            key="thank-you-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 18, stiffness: 90 }}
            className="w-full bg-white/45 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center select-none"
          >
            {/* Animated celebratory bursts in background of card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-radial-gradient from-blue-200/35 to-transparent"
                animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            {/* Celebrating Happy Bear */}
            <div className="relative w-64 h-64 mb-6">
              <TeddyBear isForgiven={true} noClicksCount={noClicksCount} />
            </div>

            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-4xl sm:text-5xl font-cursive font-bold text-blue-600 mb-4 drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]"
            >
              Thank You Ma 🩵
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg font-medium text-blue-800 max-w-sm mb-6 font-poppins"
            >
              You are really important to me ✨
            </motion.p>

            {/* Glowing baby blue heart */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ delay: 0.8, duration: 1.5, repeat: Infinity }}
              className="w-16 h-16 text-blue-500 bg-sky-100/80 rounded-full flex items-center justify-center p-3 shadow-md shadow-sky-300/40 border border-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>

            {/* Small reset button in case they want to play again */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.5 }}
              whileHover={{ opacity: 1 }}
              onClick={() => window.location.reload()}
              className="mt-8 text-xs text-blue-500 hover:text-blue-600 underline font-medium cursor-pointer"
            >
              Replay interaction 🧸
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
