// import Image from "next/image";

// export default function Home() {
//   return (
    
//     <h1>My Test App</h1>
//   );
// }



















'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import AboutSection from './home/About';
import WhyUsSection from './home/Why';
import HowToTestSection from './home/How';
import TestimonialSection from './home/Testimonials';
import FaqSection from './home/FAQ';
import GodlyFooter from './home/Footer';



const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-4 text-blue-400"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-4 text-blue-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);
const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-4 text-blue-400"><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <WhyUsSection />
      <HowToTestSection />
      <TestimonialSection />
      <FaqSection />
      <GodlyFooter />
    </div>
  );
}

// const Navbar = () => {
//   return (
//     <motion.nav 
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-gray-950/50 backdrop-blur-lg"
//     >
//       <div className="max-w-screen mx-auto flex justify-between items-center">
//         <Link href="/" className="text-3xl font-bold text-white">
//           Sentinel.ai
//         </Link>
//         <div className="flex items-center gap-4">
//           <Link href="/auth/login" className="text-gray-300 text-1xl hover:text-white transition-colors">
//             Login
//           </Link>
//           <Link href="/auth/signup" className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };




const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 font-['Roboto']"
    >
      <div className="max-w-screen mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide text-white  bg-clip-text  hover:scale-105 transition-transform duration-300"
        >
          Sentinel.ai
        </Link>

        {/* Nav Actions */}
        <div className="flex items-center gap-6">
          <Link
            href="/auth/login"
            className="text-gray-300 text-lg hover:text-blue-400 hover:scale-105 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="relative text-white text-lg font-medium px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};







const HeroSection = () => {
  const title = "Ensuring Academic Integrity with Intelligent AI Proctoring";

  // ✅ Client-safe window dimensions
  const [dimensions, setDimensions] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDimensions = () =>
        setDimensions({ w: window.innerWidth, h: window.innerHeight });

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  const titleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-center bg-grid-pattern pt-28 px-6 sm:px-8 md:px-12 overflow-hidden">
      {/* parallax background grid */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px", "0px 0px"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* holographic shards */}
      {dimensions.w > 0 &&
        [...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-10 h-10 border border-blue-400/30"
            style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
            initial={{
              x: Math.random() * dimensions.w,
              y: Math.random() * dimensions.h,
              rotate: 0,
              opacity: 0.2,
            }}
            animate={{
              y: [null, -200],
              rotate: 360,
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

      {/* scanning pulse */}
      <motion.div
        className="absolute w-96 h-96 rounded-full border-4 border-blue-400/40 blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* radial energy waves */}
      <motion.div
        className="absolute w-80 h-80 rounded-full border border-blue-500/20"
        animate={{ scale: [1, 2], opacity: [0.6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
      />

      {/* floating particles */}
      {dimensions.w > 0 && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{
                x: Math.random() * dimensions.w,
                y: Math.random() * dimensions.h,
                opacity: 0,
              }}
              animate={{
                y: [null, -30],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}

      {/* main content */}
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold text-white mb-6 leading-tight tracking-wide"
        >
          {title.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-3">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  variants={letterVariants}
                  className="inline-block"
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    color: "#60A5FA",
                    textShadow: "0px 0px 8px #3b82f6",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* glitch effect */}
        <motion.div
          className="absolute inset-x-0 top-1/3 text-white opacity-20 pointer-events-none select-none"
          animate={{
            x: [0, -5, 5, -3, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 6 }}
        >
          {title}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-4xl mx-auto"
        >
          Our cutting-edge platform provides unbiased, secure, and scalable
          online examination monitoring to uphold the standard of your
          assessments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <Link
            href="/auth/login"
            className="relative bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-transform hover:scale-105"
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-blue-400"
              animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
};







const FeaturesSection = () => {
  const features = [
    { icon: <EyeIcon />, title: "AI-Powered Monitoring", description: "Real-time analysis of video and audio feeds to detect violations like multiple faces, unauthorized voices, and tab switching." },
    { icon: <ShieldCheckIcon />, title: "Two-Tiered Security", description: "A unique system of 'Fatal Strikes' for major violations and a 'Suspicion Score' for minor infractions ensures fair and robust proctoring." },
    { icon: <BarChartIcon />, title: "Actionable Insights", description: "Receive detailed, timestamped reports for every test attempt, providing transparent and undeniable evidence of any misconduct." }
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }}
  };

  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Future of Fair Assessments</h2>
        <p className="text-lg text-gray-400 mb-16 max-w-4xl mx-auto">Our platform is built on three core principles to provide the most reliable online proctoring solution.</p>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-gray-900 p-10 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors">
              {feature.icon}
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};



const style = `
  .bg-grid-pattern {
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = style;
  document.head.appendChild(styleSheet);
}
