// 'use client';

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image'; // Using next/image for optimized images

// // --- Data for the testimonials. Easy to update here. ---
// const testimonials = [
//     {
//         name: "Dr. Alena Petrova",
//         title: "Dean of Digital Learning, Crestwood University",
//         quote: "Sentinel.ai has completely transformed our online examination process. The level of integrity and the seamless user experience is something we thought was years away. It's the gold standard.",
//         avatar: "https://placehold.co/100x100/083344/99f6e4?text=AP" // Placeholder
//     },
//     {
//         name: "Marcus Thorne",
//         title: "Lead Instructor, CodeForge Academy",
//         quote: "The accuracy of the proctoring AI is breathtaking. It catches what human proctors miss, all while respecting the privacy of our students. Our certification's value has skyrocketed.",
//         avatar: "https://placehold.co/100x100/083344/99f6e4?text=MT" // Placeholder
//     },
//     {
//         name: "Javier Solis",
//         title: "E-Learning Coordinator, Global Tech Institute",
//         quote: "Implementation was a breeze. The developer experience is as polished as the user interface. Our students trust the system, and that's the highest praise I can give.",
//         avatar: "https://placehold.co/100x100/083344/99f6e4?text=JS" // Placeholder
//     },
// ];

// // --- Helper component for character-by-character text animation ---
// const AnimatedText = ({ text, className }: { text: string, className?: string }) => {
//     const variants = {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { staggerChildren: 0.015 } },
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
//         >
//             {text.split("").map((char, index) => (
//                 <motion.span key={index} variants={charVariants} className="inline-block">
//                     {char === " " ? "\u00A0" : char}
//                 </motion.span>
//             ))}
//         </motion.p>
//     );
// };

// export default function TestimonialSection() {
//     const [activeIndex, setActiveIndex] = useState(0);

//     const contentVariants = {
//         hidden: { opacity: 0, y: 20, scale: 0.98 },
//         visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
//         exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3, ease: 'easeIn' } },
//     };
    
//     return (
//         <section className="font-sans text-white py-24 sm:py-32 bg-slate-900 overflow-hidden">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="text-center mb-20">
//                     <motion.h1 
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter"
//                     >
//                         Authenticated Signals
//                     </motion.h1>
//                     <motion.p 
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.5, duration: 0.8 }}
//                         className="max-w-2xl mx-auto mt-4 text-lg text-gray-400"
//                     >
//                         Hear from the educators and institutions who trust Sentinel.ai to uphold the integrity of their assessments.
//                     </motion.p>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
//                     {/* --- Left Column: The AI Core Visualizer --- */}
//                     <motion.div 
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
//                         className="lg:col-span-2 relative w-full h-[550px] bg-black/50 border border-cyan-800/30 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 backdrop-blur-lg flex flex-col justify-center"
//                     >
//                         <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent -z-10"></div>
//                         <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400">SENTINEL_AI :: SIGNAL_DECRYPTION</div>

//                         {/* --- Looping background animation --- */}
//                         <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl -z-10">
//                             <motion.div 
//                                 className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
//                                 animate={{ 
//                                     x: [0, 200, 0, -200, 0],
//                                     y: [0, -100, 100, 0, 0],
//                                     scale: [1, 1.2, 1, 1.1, 1],
//                                 }}
//                                 transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
//                             />
//                         </div>

//                         <AnimatePresence mode="wait">
//                             <motion.div
//                                 key={activeIndex}
//                                 variants={contentVariants}
//                                 initial="hidden"
//                                 animate="visible"
//                                 exit="exit"
//                                 className="text-center"
//                             >
//                                 <AnimatedText 
//                                     text={`“${testimonials[activeIndex].quote}”`}
//                                     className="text-2xl lg:text-3xl font-medium leading-snug text-gray-100" 
//                                 />
//                                 <div className="mt-8">
//                                     <p className="text-xl font-bold text-cyan-400">{testimonials[activeIndex].name}</p>
//                                     <p className="text-gray-400">{testimonials[activeIndex].title}</p>
//                                 </div>
//                             </motion.div>
//                         </AnimatePresence>
//                     </motion.div>

//                     {/* --- Right Column: The Source Selector --- */}
//                     <motion.div 
//                          initial={{ opacity: 0, x: 50 }}
//                          animate={{ opacity: 1, x: 0 }}
//                          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
//                          className="relative flex flex-col space-y-4"
//                     >
//                         {testimonials.map((person, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => setActiveIndex(index)}
//                                 className="relative w-full text-left p-4 rounded-lg transition-colors duration-300"
//                             >
//                                 <div className="flex items-center space-x-4">
//                                     <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-transparent">
//                                         <Image src={person.avatar} alt={person.name} width={64} height={64} className="object-cover" />
//                                     </div>
//                                     <div>
//                                         <h3 className={`text-lg font-bold tracking-wide transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-400'}`}>{person.name}</h3>
//                                         <p className={`mt-1 text-sm transition-colors ${activeIndex === index ? 'text-gray-300' : 'text-gray-600'}`}>{person.title}</p>
//                                     </div>
//                                 </div>
//                             </button>
//                         ))}
//                         {/* The animated selector bar */}
//                         <motion.div
//                             layout
//                             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                             className="absolute left-0 w-full h-24 bg-cyan-500/10 border-2 border-cyan-500 rounded-lg -z-10"
//                             style={{ top: activeIndex * 96 }} // 96px = 6rem (h-24)
//                         />
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }










'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
    {
        name: "Dr. Alena Petrova",
        title: "Dean of Digital Learning, Crestwood University",
        quote: "Sentinel.ai has completely transformed our online examination process. The level of integrity and the seamless user experience is something we thought was years away. It's the gold standard.",
        avatar: "https://placehold.co/100x100/083344/99f6e4?text=AP"
    },
    {
        name: "Marcus Thorne",
        title: "Lead Instructor, CodeForge Academy",
        quote: "The accuracy of the proctoring AI is breathtaking. It catches what human proctors miss, all while respecting the privacy of our students. Our certification's value has skyrocketed.",
        avatar: "https://placehold.co/100x100/083344/99f6e4?text=MT"
    },
    {
        name: "Javier Solis",
        title: "E-Learning Coordinator, Global Tech Institute",
        quote: "Implementation was a breeze. The developer experience is as polished as the user interface. Our students trust the system, and that's the highest praise I can give.",
        avatar: "https://placehold.co/100x100/083344/99f6e4?text=JS"
    },
];

const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
    const variants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.015 } },
    };
    const charVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };
    return (
        <motion.p
            className={className}
            variants={variants}
            initial="hidden"
            animate="visible"
        >
            {text.split("").map((char, index) => (
                <motion.span key={index} variants={charVariants} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.p>
    );
};

export default function TestimonialSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3, ease: 'easeIn' } },
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
                        Authenticated Signals
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="max-w-2xl mx-auto mt-4 text-lg text-gray-400"
                    >
                        Hear from the educators and institutions who trust Sentinel.ai to uphold the integrity of their assessments.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="lg:col-span-2 relative w-full h-[550px] bg-black/50 border border-cyan-800/30 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 backdrop-blur-lg flex flex-col justify-center"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent -z-10"></div>
                        <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400">SENTINEL_AI :: SIGNAL_DECRYPTION</div>
                        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl -z-10">
                            <motion.div
                                className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
                                animate={{
                                    x: [0, 200, 0, -200, 0],
                                    y: [0, -100, 100, 0, 0],
                                    scale: [1, 1.2, 1, 1.1, 1],
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="text-center"
                            >
                                <AnimatedText
                                    text={`“${testimonials[activeIndex].quote}”`}
                                    className="text-2xl lg:text-3xl font-medium leading-snug text-gray-100"
                                />
                                <div className="mt-8">
                                    <p className="text-xl font-bold text-cyan-400">{testimonials[activeIndex].name}</p>
                                    <p className="text-gray-400">{testimonials[activeIndex].title}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                        className="relative flex flex-col space-y-4"
                    >
                        {testimonials.map((person, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className="relative w-full text-left p-4 rounded-lg transition-colors duration-300"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-transparent">
                                        <Image src={person.avatar} alt={person.name} width={64} height={64} className="object-cover" />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold tracking-wide transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-400'}`}>{person.name}</h3>
                                        <p className={`mt-1 text-sm transition-colors ${activeIndex === index ? 'text-gray-300' : 'text-gray-600'}`}>{person.title}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                        <motion.div
                            layout
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="absolute left-0 w-full h-24 bg-cyan-500/10 border-2 border-cyan-500 rounded-lg -z-10"
                            style={{ top: activeIndex * 96 }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
