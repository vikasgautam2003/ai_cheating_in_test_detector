// 'use client';

// import { useState } from 'react';

// export default function SignupPage() {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string | null>(null); 
//   const [success, setSuccess] = useState<string>('');     

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess('');

//     try {
//       const res = await fetch("http://localhost:3000/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || 'Something went wrong');
//       }

//       setSuccess('Signup successful! Please log in.');
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unexpected error occurred');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm mx-auto mt-10">
//       <label htmlFor="email">Email:</label>
//       <input
//         id="email"
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 rounded"
//         required
//       />

//       <label htmlFor="password">Password:</label>
//       <input
//         id="password"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 rounded"
//         required
//       />

//       <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//         Sign Up
//       </button>

//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}
//     </form>
//   );
// }









'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

// --- SVG Icon Components ---
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
      <FeaturesSection />
      <Footer />
    </div>
  );
}

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-gray-950/50 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Sentinel.ai
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/auth/signup" className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

const HeroSection = () => {
  const title = "Ensuring Academic Integrity with Intelligent AI Proctoring";

  const titleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="h-screen flex items-center justify-center text-center bg-grid-pattern pt-28 px-6 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold text-white mb-6 leading-tight"
        >
          {title.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-3">
              {word.split("").map((letter, letterIndex) => (
                <motion.span key={letterIndex} variants={letterVariants} className="inline-block">
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-4xl mx-auto"
        >
          Our cutting-edge platform provides unbiased, secure, and scalable online examination monitoring to uphold the standard of your assessments.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <Link href="/auth/login" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-transform hover:scale-105">
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

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Sentinel.ai. All Rights Reserved.</p>
      </div>
    </footer>
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
