// 'use client';

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // --- Data for the FAQs. Stored here for easy updates. ---
// const faqData = [
//     {
//         query: "How does the AI detect cheating?",
//         response: "Sentinel.ai utilizes a multi-layered analysis protocol. The core AI monitors video feeds for anomalies such as gaze deviation, the presence of unauthorized persons, and mobile device usage. Simultaneously, our audio processing unit detects specific voice patterns and keywords, while background processes monitor for unauthorized tab switching or software."
//     },
//     {
//         query: "Is my personal data secure?",
//         response: "Security is our foundational principle. All data streams are encrypted end-to-end with AES-256 encryption. User identification data is anonymized and stored in a separate, isolated vault. We are fully GDPR and CCPA compliant, and your privacy is never compromised. The system is designed for integrity, not intrusion."
//     },
//     {
//         query: "What are 'Fatal Strikes' vs. 'Suspicion Score'?",
//         response: "The 'Suspicion Score' is an intelligent metric that algorithmically increases with minor, repeated infractions like brief losses of focus or tab switches. 'Fatal Strikes' are reserved for critical, undeniable breaches of integrity, such as a second person appearing on camera or clear voice communication. A threshold of fatal strikes results in immediate test termination."
//     },
//     {
//         query: "Can I use this on any device?",
//         response: "Sentinel.ai is engineered for broad compatibility. It runs seamlessly on modern desktop and laptop browsers, including Chrome, Firefox, and Safari. While a stable internet connection is required for real-time analysis, the platform is optimized to handle minor network fluctuations without disrupting the assessment flow."
//     }
// ];

// // --- Helper component for the cinematic text animations ---
// const AnimatedText = ({ text, className, stagger = 0.01 }: { text: string, className?: string, stagger?: number }) => {
//     const variants = {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { staggerChildren: stagger } },
//     };
//     const charVariants = {
//         hidden: { opacity: 0, y: 10 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//     };
//     return (
//         <motion.p
//             className={className}
//             variants={variants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//         >
//             {text.split("").map((char, index) => (
//                 <motion.span key={index} variants={charVariants} className="inline-block">
//                     {char === " " ? "\u00A0" : char}
//                 </motion.span>
//             ))}
//         </motion.p>
//     );
// };

// export default function FaqSection() {
//     const [activeIndex, setActiveIndex] = useState(0);

//     const contentVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', when: "beforeChildren" } },
//         exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
//     };

//     return (
//         <section className="font-sans text-white py-24 sm:py-32 bg-slate-900 overflow-hidden">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="text-center mb-20">
//                      <motion.h1 
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter"
//                     >
//                         System Queries
//                     </motion.h1>
//                     <motion.p 
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.5, duration: 0.8 }}
//                         className="max-w-3xl mx-auto mt-4 text-lg text-gray-400"
//                     >
//                         Access the Sentinel knowledge base. Select a query to receive a direct response from the core AI.
//                     </motion.p>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
//                     {/* --- Left Column: The Query Log --- */}
//                     <motion.div 
//                         initial={{ opacity: 0, x: -50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
//                         className="relative flex flex-col space-y-2"
//                     >
//                         {faqData.map((faq, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => setActiveIndex(index)}
//                                 className="relative w-full text-left p-6 rounded-lg transition-colors duration-300"
//                             >
//                                 <h3 className={`text-xl font-bold tracking-wide transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-500 hover:text-white'}`}>{faq.query}</h3>
//                             </button>
//                         ))}
//                         {/* The animated selector bar */}
//                         <motion.div
//                             layout
//                             transition={{ type: 'spring', stiffness: 350, damping: 35 }}
//                             className="absolute left-0 w-full h-24 bg-cyan-500/10 border-2 border-cyan-500 rounded-lg -z-10"
//                             style={{ top: activeIndex * 96 }} // 96px = 6rem (h-24)
//                         />
//                     </motion.div>

//                     {/* --- Right Column: The AI Response Terminal --- */}
//                     <motion.div 
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
//                         className="lg:col-span-2 relative w-full min-h-[400px] bg-black/50 border border-cyan-800/30 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 backdrop-blur-lg flex flex-col"
//                     >
//                         <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent -z-10"></div>
//                         <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400">SENTINEL_AI :: RESPONSE_TERMINAL</div>
//                         <div className="absolute top-4 right-4 text-xs font-mono text-green-400 flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>SECURE</div>
                        
//                         <div className="flex-grow flex items-center">
//                              <AnimatePresence mode="wait">
//                                 <motion.div
//                                     key={activeIndex}
//                                     variants={contentVariants}
//                                     initial="hidden"
//                                     animate="visible"
//                                     exit="exit"
//                                 >
//                                     <AnimatedText 
//                                         text={faqData[activeIndex].response}
//                                         className="text-xl text-gray-200 leading-relaxed"
//                                     />
//                                 </motion.div>
//                             </AnimatePresence>
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }









'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const faqData = [
    {
        query: "How does the AI detect cheating?",
        response: "Sentinel.ai utilizes a multi-layered analysis protocol. The core AI monitors video feeds for anomalies such as gaze deviation, the presence of unauthorized persons, and mobile device usage. Simultaneously, our audio processing unit detects specific voice patterns and keywords, while background processes monitor for unauthorized tab switching or software."
    },
    {
        query: "Is my personal data secure?",
        response: "Security is our foundational principle. All data streams are encrypted end-to-end with AES-256 encryption. User identification data is anonymized and stored in a separate, isolated vault. We are fully GDPR and CCPA compliant, and your privacy is never compromised. The system is designed for integrity, not intrusion."
    },
    {
        query: "What are 'Fatal Strikes' vs. 'Suspicion Score'?",
        response: "The 'Suspicion Score' is an intelligent metric that algorithmically increases with minor, repeated infractions like brief losses of focus or tab switches. 'Fatal Strikes' are reserved for critical, undeniable breaches of integrity, such as a second person appearing on camera or clear voice communication. A threshold of fatal strikes results in immediate test termination."
    },
    {
        query: "Can I use this on any device?",
        response: "Sentinel.ai is engineered for broad compatibility. It runs seamlessly on modern desktop and laptop browsers, including Chrome, Firefox, and Safari. While a stable internet connection is required for real-time analysis, the platform is optimized to handle minor network fluctuations without disrupting the assessment flow."
    }
];

const AnimatedText = ({ text, className, stagger = 0.01 }: { text: string; className?: string; stagger?: number }) => {
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: stagger } },
    };
    const charVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };
    return (
        <motion.p
            className={className}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            {text.split("").map((char, index) => (
                <motion.span key={index} variants={charVariants} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.p>
    );
};

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren" },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3, ease: "easeIn" },
        },
    };

    return (
        <section className="font-sans text-white py-24 sm:py-32 bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter"
                    >
                        System Queries
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="max-w-3xl mx-auto mt-4 text-lg text-gray-400"
                    >
                        Access the Sentinel knowledge base. Select a query to receive a direct response from the core AI.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative flex flex-col space-y-2"
                    >
                        {faqData.map((faq, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className="relative w-full text-left p-6 rounded-lg transition-colors duration-300"
                            >
                                <h3 className={`text-xl font-bold tracking-wide transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-500 hover:text-white'}`}>{faq.query}</h3>
                            </button>
                        ))}
                        <motion.div
                            layout
                            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                            className="absolute left-0 w-full h-24 bg-cyan-500/10 border-2 border-cyan-500 rounded-lg -z-10"
                            style={{ top: activeIndex * 96 }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="lg:col-span-2 relative w-full min-h-[400px] bg-black/50 border border-cyan-800/30 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 backdrop-blur-lg flex flex-col"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent -z-10"></div>
                        <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400">SENTINEL_AI :: RESPONSE_TERMINAL</div>
                        <div className="absolute top-4 right-4 text-xs font-mono text-green-400 flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>SECURE</div>

                        <div className="flex-grow flex items-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <AnimatedText
                                        text={faqData[activeIndex].response}
                                        className="text-xl text-gray-200 leading-relaxed"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
