import { motion } from 'motion/react';

interface TeddyBearProps {
  isForgiven: boolean;
  noClicksCount: number;
}

export default function TeddyBear({ isForgiven, noClicksCount }: TeddyBearProps) {
  // Determine anxious shake effect intensity based on number of 'No' clicks
  const shakeX = noClicksCount > 0 ? [0, -4, 4, -4, 4, 0] : [0];
  const shakeTransition = noClicksCount > 0 
    ? { duration: 0.4, ease: 'easeInOut', repeat: 1 } 
    : undefined;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Animated Orbiting Sparkles or Teardrops around teddy */}
      {!isForgiven && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated Falling Tear Left */}
          <motion.div
            className="absolute left-[38%] top-[45%] w-2 h-3 bg-cyan-200 rounded-full opacity-80 shadow-[0_0_4px_#a5f3fc]"
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{ y: 35, opacity: [0, 1, 0], scale: [0.5, 1, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.2,
              ease: 'easeIn',
            }}
          />
          {/* Animated Falling Tear Right */}
          <motion.div
            className="absolute right-[38%] top-[45%] w-2 h-3 bg-cyan-200 rounded-full opacity-80 shadow-[0_0_4px_#a5f3fc]"
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{ y: 35, opacity: [0, 1, 0], scale: [0.5, 1, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1.2,
              ease: 'easeIn',
            }}
          />
        </div>
      )}

      {/* Main Teddy Bear Body wrapper with gentle breathing / idle animation */}
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={{
          y: isForgiven ? [0, -10, 0] : [0, 4, 0],
          scale: isForgiven ? [1, 1.06, 1] : [1, 0.98, 1],
          x: shakeX,
        }}
        transition={
          shakeTransition || {
            duration: isForgiven ? 2 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }
        }
      >
        <svg
          viewBox="0 0 200 200"
          className="w-56 h-56 drop-shadow-xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Definitions for Gradient fills matching the reference image */}
          <defs>
            <radialGradient id="bearBody" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#EFF6FF" />    {/* Very soft blue-white highlight */}
              <stop offset="60%" stopColor="#BFDBFE" />   {/* Soft pastel baby blue */}
              <stop offset="100%" stopColor="#93C5FD" />  {/* Shadow baby blue */}
            </radialGradient>
            <radialGradient id="innerEar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </radialGradient>
            <linearGradient id="satinRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <radialGradient id="footPad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#60A5FA" />
            </radialGradient>
          </defs>

          {/* LEFT EAR */}
          <circle cx="55" cy="55" r="22" fill="url(#bearBody)" />
          <circle cx="55" cy="55" r="13" fill="url(#innerEar)" />

          {/* RIGHT EAR */}
          <circle cx="145" cy="55" r="22" fill="url(#bearBody)" />
          <circle cx="145" cy="55" r="13" fill="url(#innerEar)" />

          {/* REAR PAWS (Feet) - Redesigned with hearts and toes like the reference image */}
          {/* Left Foot */}
          <g>
            <circle cx="60" cy="155" r="18" fill="url(#bearBody)" />
            {/* Heart Pad in the center */}
            <path 
              d="M 60 162 C 54 156, 50 151, 60 146 C 70 151, 66 156, 60 162 Z" 
              fill="url(#footPad)" 
              opacity="0.85" 
            />
            {/* 3 Circular Toes */}
            <circle cx="49" cy="144" r="3.5" fill="url(#footPad)" opacity="0.85" />
            <circle cx="60" cy="140" r="4" fill="url(#footPad)" opacity="0.85" />
            <circle cx="71" cy="144" r="3.5" fill="url(#footPad)" opacity="0.85" />
          </g>

          {/* Right Foot */}
          <g>
            <circle cx="140" cy="155" r="18" fill="url(#bearBody)" />
            {/* Heart Pad in the center */}
            <path 
              d="M 140 162 C 134 156, 130 151, 140 146 C 150 151, 146 156, 140 162 Z" 
              fill="url(#footPad)" 
              opacity="0.85" 
            />
            {/* 3 Circular Toes */}
            <circle cx="129" cy="144" r="3.5" fill="url(#footPad)" opacity="0.85" />
            <circle cx="140" cy="140" r="4" fill="url(#footPad)" opacity="0.85" />
            <circle cx="151" cy="144" r="3.5" fill="url(#footPad)" opacity="0.85" />
          </g>

          {/* MAIN BODY */}
          <ellipse cx="100" cy="130" rx="42" ry="38" fill="url(#bearBody)" />
          {/* Belly Patch */}
          <ellipse cx="100" cy="134" rx="28" ry="24" fill="#FFFFFF" opacity="0.9" />

          {/* MAIN HEAD */}
          <circle cx="100" cy="95" r="48" fill="url(#bearBody)" />

          {/* BLUSH CHEEKS */}
          {isForgiven ? (
            <>
              {/* Intense happy pink blush */}
              <ellipse cx="70" cy="104" rx="10" ry="6" fill="#f43f5e" opacity="0.45" />
              <ellipse cx="130" cy="104" rx="10" ry="6" fill="#f43f5e" opacity="0.45" />
            </>
          ) : (
            <>
              {/* Soft pleading blush */}
              <ellipse cx="68" cy="106" rx="8" ry="4" fill="#FFAFAD" opacity="0.75" />
              <ellipse cx="132" cy="106" rx="8" ry="4" fill="#FFAFAD" opacity="0.75" />
            </>
          )}

          {/* SNOUT / MUZZLE */}
          <ellipse cx="100" cy="106" rx="15" ry="11" fill="#FFFFFF" />

          {/* NOSE */}
          {isForgiven ? (
            <path
              d="M94 100 Q100 95 106 100 Q100 106 94 100"
              fill="#1d4ed8"
            />
          ) : (
            <polygon
              points="94,101 106,101 100,107"
              fill="#3b82f6"
              rx="2.5"
            />
          )}

          {/* MOUTH */}
          {isForgiven ? (
            // Big happy open smile
            <path
              d="M92 107 Q100 117 108 107"
              stroke="#2563eb"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            // Shy tiny sad curve
            <path
              d="M93 113 Q100 108 107 113"
              stroke="#4b5563"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* EYES - High fidelity crying / pleading or happy */}
          {isForgiven ? (
            // Joyful happy eye arcs ^_^
            <>
              <path
                d="M70 94 Q78 86 86 94"
                stroke="#1e3a8a"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M114 94 Q122 86 130 94"
                stroke="#1e3a8a"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
            </>
          ) : (
            // Big wide glistening crying eyes matching reference bear
            <>
              {/* Left Eye */}
              <circle cx="76" cy="92" r="8" fill="#1e3a8a" />
              <circle cx="74.5" cy="89" r="3" fill="#FFFFFF" /> {/* Highlighting reflection 1 */}
              <circle cx="78.5" cy="94" r="1.5" fill="#FFFFFF" /> {/* Highlighting reflection 2 */}
              <path d="M 72 90 A 4 4 0 0 1 76 94" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.6" />
              
              {/* Right Eye */}
              <circle cx="124" cy="92" r="8" fill="#1e3a8a" />
              <circle cx="122.5" cy="89" r="3" fill="#FFFFFF" />
              <circle cx="126.5" cy="94" r="1.5" fill="#FFFFFF" />
              <path d="M 120 90 A 4 4 0 0 1 124 94" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.6" />
              
              {/* Drooped sad eyebrows - redesigned to slope upwards towards center (/ \) */}
              <path
                d="M66 86 Q75 77 83 79"
                stroke="#1e3a8a"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M134 86 Q125 77 117 79"
                stroke="#1e3a8a"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </>
          )}

          {/* FRONT PAWS / ARMS */}
          {isForgiven ? (
            // Happy raised waving paws
            <>
              <motion.path
                d="M 50 130 C 35 110, 30 100, 45 90 C 55 95, 55 110, 60 120"
                fill="url(#bearBody)"
                animate={{ rotate: [0, -12, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.path
                d="M 150 130 C 165 110, 170 100, 155 90 C 145 95, 145 110, 140 120"
                fill="url(#bearBody)"
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.25 }}
              />
            </>
          ) : (
            // Paws shyly pressed together in the middle of the chest (Reference posture)
            <>
              {/* Left Arm connecting body to paw */}
              <path
                d="M 64 126 C 73 120, 83 124, 88 132 C 83 138, 70 138, 64 126 Z"
                fill="url(#bearBody)"
              />
              {/* Left Paw */}
              <ellipse cx="88" cy="132" rx="12" ry="9" fill="url(#bearBody)" />
              <path d="M 86 127 C 88 129, 88 135, 86 137" stroke="#93c5fd" strokeWidth="1" fill="none" opacity="0.8" />

              {/* Right Arm connecting body to paw */}
              <path
                d="M 136 126 C 127 120, 117 124, 112 132 C 117 138, 130 138, 136 126 Z"
                fill="url(#bearBody)"
              />
              {/* Right Paw */}
              <ellipse cx="112" cy="132" rx="12" ry="9" fill="url(#bearBody)" />
              <path d="M 114 127 C 112 129, 112 135, 114 137" stroke="#93c5fd" strokeWidth="1" fill="none" opacity="0.8" />
            </>
          )}

          {/* BEAUTIFUL SATIN NECK RIBBON BOW on the side of its neck (Reference style) */}
          <g transform="translate(118, 112)">
            {/* Left loop */}
            <path 
              d="M 0 0 C -16 -12, -14 6, 0 0 Z" 
              fill="url(#satinRibbon)" 
              stroke="#3b82f6" 
              strokeWidth="0.8" 
            />
            {/* Right loop */}
            <path 
              d="M 0 0 C 18 -8, 14 10, 0 0 Z" 
              fill="url(#satinRibbon)" 
              stroke="#3b82f6" 
              strokeWidth="0.8" 
            />
            {/* Tails */}
            <path 
              d="M 0 0 Q -8 15 -14 20" 
              stroke="#60a5fa" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" 
            />
            <path 
              d="M 0 0 Q 5 18 10 24" 
              stroke="#60a5fa" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" 
            />
            {/* Knot */}
            <circle cx="0" cy="0" r="4.5" fill="url(#satinRibbon)" stroke="#2563eb" strokeWidth="0.5" />
            <circle cx="-1" cy="-1" r="1.2" fill="#FFFFFF" opacity="0.8" /> {/* Gloss shine */}
          </g>
        </svg>

        {/* Halo Glow effect behind happy Teddy */}
        {isForgiven && (
          <motion.div
            className="absolute -z-10 bg-cyan-200/50 blur-3xl rounded-full"
            style={{ width: '190px', height: '190px' }}
            animate={{
              scale: [0.95, 1.25, 0.95],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
