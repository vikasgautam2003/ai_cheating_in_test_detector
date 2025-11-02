// 'use client';

// import React, { useState } from 'react';
// import { motion, AnimatePresence, Variants } from 'framer-motion';

// const FaceScanIcon: React.FC = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
//     <circle cx="12" cy="12" r="3"></circle>
//   </svg>
// );

// const MultipleFacesIcon: React.FC = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//     <circle cx="9" cy="7" r="4"></circle>
//     <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
//     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//   </svg>
// );

// const SoundWaveIcon: React.FC = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M2 10v4"></path>
//     <path d="M6 7v10"></path>
//     <path d="M10 4v16"></path>
//     <path d="M14 7v10"></path>
//     <path d="M18 10v4"></path>
//   </svg>
// );

// const TabSwitchIcon: React.FC = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 12V7H5a2 2 0 0 1 0-4h14a2 2 0 0 1 2 2v5"></path>
//     <path d="M3 12v5a2 2 0 0 0 2 2h14a2 2 0 0 0 0-4H5"></path>
//   </svg>
// );

// const CheckShieldIcon: React.FC = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
//     <path d="m9 12 2 2 4-4"></path>
//   </svg>
// );

// type RuleColor = 'green' | 'red' | 'yellow';

// interface Rule {
//   title: string;
//   description: string;
//   level: string;
//   icon: React.FC;
//   color: RuleColor;
// }

// const rulesData: Rule[] = [
//   {
//     title: "Maintain Focus",
//     description:
//       "The system requires your face to be centered and clearly visible at all times. This ensures the integrity of the test environment and confirms your identity throughout the session.",
//     level: "Best Practice",
//     icon: CheckShieldIcon,
//     color: "green",
//   },
//   {
//     title: "One Person Only",
//     description:
//       "The AI is trained to detect the presence of multiple individuals. Ensure you are completely alone in a quiet room to avoid triggering a fatal strike, which could invalidate your test.",
//     level: "Fatal Strike",
//     icon: MultipleFacesIcon,
//     color: "red",
//   },
//   {
//     title: "Maintain Silence",
//     description:
//       "Ambient noise is acceptable, but conversations or specific voice patterns will be flagged. The audio surveillance system is active to prevent any form of external assistance.",
//     level: "Fatal Strike",
//     icon: SoundWaveIcon,
//     color: "red",
//   },
//   {
//     title: "Stay on Tab",
//     description:
//       "Navigating away from the test window, minimizing the browser, or opening new tabs will be logged as a suspicious event and will increase your suspicion score.",
//     level: "Suspicion Score",
//     icon: TabSwitchIcon,
//     color: "yellow",
//   },
// ];

// const levelStyles: Record<RuleColor, string> = {
//   green: "bg-green-900/50 text-green-300 border border-green-700/50",
//   red: "bg-red-900/50 text-red-300 border border-red-700/50",
//   yellow: "bg-yellow-900/50 text-yellow-300 border border-yellow-700/50",
// };

// const coreStyles: Record<RuleColor, string> = {
//   green: "text-green-400",
//   red: "text-red-400",
//   yellow: "text-yellow-400",
// };

// const contentVariants: Variants = {
//   hidden: { opacity: 0, y: 20, scale: 0.98 },
//   visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
//   exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } },
// };

// const titleVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
// };
// const charVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
// };

// export default function HowToTestSection(): JSX.Element {
//   const [activeRule, setActiveRule] = useState<number>(0);

//   return (
//     <section className="font-sans text-white py-24 sm:py-32 bg-slate-900 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-24">
//           <motion.h1
//             className="font-serif text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter"
//             variants={titleVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {"The Protocol for Success.".split("").map((char, i) => (
//               <motion.span key={i} variants={charVariants} className="inline-block">
//                 {char === " " ? "\u00A0" : char}
//               </motion.span>
//             ))}
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 0.8 }}
//             className="max-w-3xl mx-auto mt-6 text-lg text-gray-400"
//           >
//             Our system is designed for absolute fairness and security. Understanding the protocol is the first step to a successful assessment. Follow these rules to ensure a valid and seamless experience.
//           </motion.p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
//             className="relative flex flex-col space-y-4"
//             aria-hidden={false}
//           >
//             {rulesData.map((rule, index) => {
//               const isActive = index === activeRule;
//               return (
//                 <button
//                   key={index}
//                   onClick={() => setActiveRule(index)}
//                   className={`relative w-full text-left p-6 rounded-lg transition-colors duration-300 ${isActive ? 'bg-gray-800/70' : 'hover:bg-gray-800/50'}`}
//                   type="button"
//                 >
//                   <h3 className={`text-xl font-bold tracking-wide ${isActive ? 'text-white' : 'text-gray-500'}`}>
//                     {rule.title}
//                   </h3>
//                   <p className={`${isActive ? 'text-gray-300' : 'text-gray-600'}`}>Learn about this critical testing rule.</p>
//                   {isActive && (
//                     <motion.div
//                       layoutId="selectorHighlight"
//                       className="absolute inset-0 rounded-lg border-2 border-cyan-500 pointer-events-none"
//                       initial={false}
//                     />
//                   )}
//                 </button>
//               );
//             })}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
//             className="relative w-full h-[500px] bg-black/50 border border-cyan-800/30 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 backdrop-blur-lg flex flex-col justify-between"
//           >
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent pointer-events-none"></div>
//             <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400">SENTINEL_AI :: CORE_VISUALIZATION</div>

//             <div className="flex-grow flex items-center justify-center">
//               <AnimatePresence>
//                 <motion.div
//                   key={activeRule}
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   className="text-center w-full"
//                 >
//                   <div className={`mx-auto ${coreStyles[rulesData[activeRule].color]}`} aria-hidden>
//                     {React.createElement(rulesData[activeRule].icon)}
//                   </div>
//                   <h3 className={`mt-4 text-3xl font-bold tracking-wide ${coreStyles[rulesData[activeRule].color]}`}>
//                     {rulesData[activeRule].title}
//                   </h3>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             <div className="flex-shrink-0">
//               <AnimatePresence>
//                 <motion.div
//                   key={`meta-${activeRule}`}
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                 >
//                   <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${levelStyles[rulesData[activeRule].color]}`}>
//                     {rulesData[activeRule].level}
//                   </span>
//                   <p className="mt-4 text-gray-300 text-center leading-relaxed">{rulesData[activeRule].description}</p>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }










// 'use client';

// import React, { useState } from 'react';
// import { motion, AnimatePresence, Variants } from 'framer-motion';

// const MultipleFacesIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//     <circle cx="9" cy="7" r="4"></circle>
//     <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
//     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//   </svg>
// );

// const SoundWaveIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M2 10v4"></path>
//     <path d="M6 7v10"></path>
//     <path d="M10 4v16"></path>
//     <path d="M14 7v10"></path>
//     <path d="M18 10v4"></path>
//   </svg>
// );

// const TabSwitchIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 12V7H5a2 2 0 0 1 0-4h14a2 2 0 0 1 2 2v5"></path>
//     <path d="M3 12v5a2 2 0 0 0 2 2h14a2 2 0 0 0 0-4H5"></path>
//   </svg>
// );

// const CheckShieldIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
//     <path d="m9 12 2 2 4-4"></path>
//   </svg>
// );

// type RuleColor = 'green' | 'red' | 'yellow';

// interface Rule {
//   title: string;
//   description: string;
//   level: string;
//   icon: React.FC;
//   color: RuleColor;
// }

// const rulesData: Rule[] = [
//   {
//     title: "Maintain Focus",
//     description:
//       "Your face must remain clearly visible and centered at all times. This ensures integrity of the session and verifies your identity continuously.",
//     level: "Best Practice",
//     icon: CheckShieldIcon,
//     color: "green",
//   },
//   {
//     title: "One Person Only",
//     description:
//       "Our AI detects multiple individuals instantly. Remain alone in your environment to avoid a fatal strike that may invalidate your test.",
//     level: "Fatal Strike",
//     icon: MultipleFacesIcon,
//     color: "red",
//   },
//   {
//     title: "Maintain Silence",
//     description:
//       "The system monitors audio for conversations or patterns. Speak or collaborate, and you risk immediate disqualification.",
//     level: "Fatal Strike",
//     icon: SoundWaveIcon,
//     color: "red",
//   },
//   {
//     title: "Stay on Tab",
//     description:
//       "Leaving the window, minimizing, or switching tabs is logged as suspicious behavior and increases your suspicion score.",
//     level: "Suspicion Score",
//     icon: TabSwitchIcon,
//     color: "yellow",
//   },
// ];

// const levelStyles: Record<RuleColor, string> = {
//   green: "bg-green-900/40 text-green-300 border border-green-500/50",
//   red: "bg-red-900/40 text-red-300 border border-red-500/50",
//   yellow: "bg-yellow-900/40 text-yellow-300 border border-yellow-500/50",
// };

// const coreStyles: Record<RuleColor, string> = {
//   green: "text-green-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]",
//   red: "text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]",
//   yellow: "text-yellow-400 drop-shadow-[0_0_12px_rgba(234,179,8,0.7)]",
// };

// const contentVariants: Variants = {
//   hidden: { opacity: 0, y: 20, scale: 0.96 },
//   visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
//   exit: { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.25, ease: 'easeIn' } },
// };

// export default function HowToTestSection(): JSX.Element {
//   const [activeRule, setActiveRule] = useState<number>(0);

//   return (
//     <section className="relative font-sans text-white py-24 sm:py-32 bg-slate-950 overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_70%)]"></div>
//       <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-24">
//           <motion.h1
//             className="font-serif text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             The Protocol for Success.
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 0.8 }}
//             className="max-w-3xl mx-auto mt-6 text-lg text-gray-400"
//           >
//             Our monitoring system blends precision and fairness. Understand the rules, follow the protocol, and you’ll experience the smoothest possible assessment journey.
//           </motion.p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: 'easeOut' }}
//             className="relative flex flex-col space-y-4"
//           >
//             {rulesData.map((rule, index) => {
//               const isActive = index === activeRule;
//               return (
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   key={index}
//                   onClick={() => setActiveRule(index)}
//                   className={`relative w-full text-left p-6 rounded-xl backdrop-blur-sm transition-colors duration-300 ${isActive ? 'bg-cyan-900/30 border border-cyan-500/50' : 'hover:bg-gray-800/40'}`}
//                   type="button"
//                 >
//                   <h3 className={`text-2xl font-semibold tracking-wide ${isActive ? 'text-white' : 'text-gray-500'}`}>
//                     {rule.title}
//                   </h3>
//                   <p className={`${isActive ? 'text-gray-300' : 'text-gray-600'}`}>Tap to reveal more details.</p>
//                 </motion.button>
//               );
//             })}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, ease: 'easeOut' }}
//             className="relative w-full h-[500px] bg-black/60 border border-cyan-800/40 rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.2)] p-8 backdrop-blur-lg flex flex-col justify-between"
//           >
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent"></div>
//             <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400">SENTINEL_AI :: CORE_MONITOR</div>

//             <div className="flex-grow flex items-center justify-center">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeRule}
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   className="text-center w-full relative"
//                 >
//                   <motion.div
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
//                     className={`absolute -inset-6 rounded-full blur-3xl opacity-20 ${coreStyles[rulesData[activeRule].color]}`}
//                   ></motion.div>

//                   <div className={`relative z-10 mx-auto ${coreStyles[rulesData[activeRule].color]}`}>
//                     {React.createElement(rulesData[activeRule].icon)}
//                   </div>
//                   <h3 className={`mt-6 text-4xl font-bold tracking-wide ${coreStyles[rulesData[activeRule].color]}`}>
//                     {rulesData[activeRule].title}
//                   </h3>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             <div className="flex-shrink-0">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={`meta-${activeRule}`}
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                 >
//                   <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${levelStyles[rulesData[activeRule].color]}`}>
//                     {rulesData[activeRule].level}
//                   </span>
//                   <p className="mt-4 text-gray-300 text-center leading-relaxed">{rulesData[activeRule].description}</p>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }














'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const MultipleFacesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const SoundWaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10v4"></path>
    <path d="M6 7v10"></path>
    <path d="M10 4v16"></path>
    <path d="M14 7v10"></path>
    <path d="M18 10v4"></path>
  </svg>
);

const TabSwitchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14a2 2 0 0 1 2 2v5"></path>
    <path d="M3 12v5a2 2 0 0 0 2 2h14a2 2 0 0 0 0-4H5"></path>
  </svg>
);

const CheckShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

type RuleColor = 'green' | 'red' | 'yellow';

interface Rule {
  title: string;
  description: string;
  level: string;
  icon: React.FC;
  color: RuleColor;
}

const rulesData: Rule[] = [
  {
    title: "Maintain Focus",
    description:
      "Your face must remain clearly visible and centered at all times. This ensures integrity of the session and verifies your identity continuously.",
    level: "Best Practice",
    icon: CheckShieldIcon,
    color: "green",
  },
  {
    title: "One Person Only",
    description:
      "Our AI detects multiple individuals instantly. Remain alone in your environment to avoid a fatal strike that may invalidate your test.",
    level: "Fatal Strike",
    icon: MultipleFacesIcon,
    color: "red",
  },
  {
    title: "Maintain Silence",
    description:
      "The system monitors audio for conversations or patterns. Speak or collaborate, and you risk immediate disqualification.",
    level: "Fatal Strike",
    icon: SoundWaveIcon,
    color: "red",
  },
  {
    title: "Stay on Tab",
    description:
      "Leaving the window, minimizing, or switching tabs is logged as suspicious behavior and increases your suspicion score.",
    level: "Suspicion Score",
    icon: TabSwitchIcon,
    color: "yellow",
  },
];

const levelStyles: Record<RuleColor, string> = {
  green: "bg-green-900/40 text-green-300 border border-green-500/50",
  red: "bg-red-900/40 text-red-300 border border-red-500/50",
  yellow: "bg-yellow-900/40 text-yellow-300 border border-yellow-500/50",
};

const coreStyles: Record<RuleColor, string> = {
  green: "text-green-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]",
  red: "text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]",
  yellow: "text-yellow-400 drop-shadow-[0_0_12px_rgba(234,179,8,0.7)]",
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.25, ease: 'easeIn' } },
};

export default function HowToTestSection() {
  const [activeRule, setActiveRule] = useState<number>(0);

  return (
    <section className="relative font-sans text-white py-24 sm:py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.h1
            className="font-serif text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            The Protocol for Success.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-3xl mx-auto mt-6 text-lg text-gray-400"
          >
            Our monitoring system blends precision and fairness. Understand the rules, follow the protocol, and you’ll experience the smoothest possible assessment journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex flex-col space-y-4"
          >
            {rulesData.map((rule, index) => {
              const isActive = index === activeRule;
              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={index}
                  onClick={() => setActiveRule(index)}
                  className={`relative w-full text-left p-6 rounded-xl backdrop-blur-sm transition-colors duration-300 ${isActive ? 'bg-cyan-900/30 border border-cyan-500/50' : 'hover:bg-gray-800/40'}`}
                  type="button"
                >
                  <h3 className={`text-2xl font-semibold tracking-wide ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    {rule.title}
                  </h3>
                  <p className={`${isActive ? 'text-gray-300' : 'text-gray-600'}`}>Tap to reveal more details.</p>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full h-[500px] bg-black/60 border border-cyan-800/40 rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.2)] p-8 backdrop-blur-lg flex flex-col justify-between"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent"></div>
            <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400">SENTINEL_AI :: CORE_MONITOR</div>

            <div className="flex-grow flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRule}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center w-full relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className={`absolute -inset-6 rounded-full blur-3xl opacity-20 ${coreStyles[rulesData[activeRule].color]}`}
                  ></motion.div>

                  <div className={`relative z-10 mx-auto ${coreStyles[rulesData[activeRule].color]}`}>
                    {React.createElement(rulesData[activeRule].icon)}
                  </div>
                  <h3 className={`mt-6 text-4xl font-bold tracking-wide ${coreStyles[rulesData[activeRule].color]}`}>
                    {rulesData[activeRule].title}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`meta-${activeRule}`}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${levelStyles[rulesData[activeRule].color]}`}>
                    {rulesData[activeRule].level}
                  </span>
                  <p className="mt-4 text-gray-300 text-center leading-relaxed">{rulesData[activeRule].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
