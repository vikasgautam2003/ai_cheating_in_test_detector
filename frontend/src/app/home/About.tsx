



// 'use client';

// import React, { useRef } from 'react';
// import { gsap } from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// // Register the ScrollTrigger plugin with GSAP
// gsap.registerPlugin(ScrollTrigger);

// // --- Your existing SVG Icons (Untouched) ---
// const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 inline-block mr-2 text-cyan-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
// const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-cyan-400"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
// const MicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-cyan-400"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>;

// export default function AboutSection() {
//     const mainRef = useRef(null);

//     useGSAP(() => {
//         // --- Animate the main headline on load ---
//         gsap.from(".main-headline-word", {
//             y: 100,
//             opacity: 0,
//             stagger: 0.1,
//             duration: 0.8,
//             ease: 'power3.out',
//         });

//         // --- Animate each text block as it scrolls into view ---
//         const textBlocks = gsap.utils.toArray('.text-reveal-block');
//         textBlocks.forEach((block: any) => {
//             gsap.from(block.children, {
//                 y: 50,
//                 opacity: 0,
//                 stagger: 0.15,
//                 duration: 0.7,
//                 ease: 'power3.out',
//                 scrollTrigger: {
//                     trigger: block,
//                     start: 'top 85%', // Start animation when the top of the block is 85% from the top of the viewport
//                 }
//             });
//         });

//         // --- Create a parallax effect for each media placeholder ---
//         const mediaBlocks = gsap.utils.toArray('.media-parallax-block');
//         mediaBlocks.forEach((block: any) => {
//             gsap.fromTo(block, {
//                 y: '-20%' // Start slightly up
//             }, {
//                 y: '20%', // End slightly down
//                 ease: 'none',
//                 scrollTrigger: {
//                     trigger: block,
//                     start: 'top bottom', // Start when the top of the block hits the bottom of the viewport
//                     end: 'bottom top', // End when the bottom of the block leaves the top of the viewport
//                     scrub: true, // This makes the animation smoothly follow the scrollbar
//                 }
//             });
//         });

//     }, { scope: mainRef });

//     return (
//         <section ref={mainRef} className="font-sans text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
//             <div className="max-w-7xl mx-auto grid grid-cols-12 gap-x-8 gap-y-16 lg:gap-y-32 items-center">
                
//                 <div className="col-span-12 md:col-span-10">
//                     <h1 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter overflow-hidden">
//                         {/* Splitting the title into words for the animation */}
//                         {"Redefining Integrity in the Digital Age.".split(" ").map((word, index) => (
//                             <span key={index} className="inline-block main-headline-word pr-2">{word}</span>
//                         ))}
//                     </h1>
//                 </div>

//                 <div className="col-span-12 md:col-span-5 md:col-start-8 mt-12 md:mt-24 text-reveal-block">
//                     <h2 className="text-2xl font-bold text-cyan-400 mb-4 tracking-wide">The Challenge</h2>
//                     <p className="text-gray-300 leading-relaxed text-lg">
//                         Traditional assessments are vulnerable. Digital education demands a new standard of trust—a system that ensures fairness, eliminates bias, and upholds academic integrity without compromise. We built Sentinel.ai to be that standard.
//                     </p>
//                 </div>

//                 <div className="col-span-12 md:col-span-7 mt-16 media-parallax-block">
//                     <div className="relative aspect-video bg-black/30 border border-gray-800 rounded-lg p-4 flex items-end shadow-2xl shadow-cyan-500/10">
//                         <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-t-lg"></div>
//                         <p className="font-mono text-sm text-cyan-400 z-10">// AI_FEED_VISUALIZATION</p>
//                     </div>
//                 </div>
                
//                 <div className="col-span-12 md:col-span-5 md:col-start-6 mt-16 text-right text-reveal-block">
//                     <h2 className="text-2xl font-bold text-cyan-400 mb-4 tracking-wide">Intelligent Monitoring</h2>
//                     <p className="text-gray-300 leading-relaxed text-lg">
//                         Our proprietary AI analyzes video, audio, and on-screen activity in real-time. It identifies potential academic integrity violations with unparalleled accuracy, providing a robust, non-intrusive proctoring solution that respects user privacy.
//                     </p>
//                 </div>

//                 <div className="col-span-12 md:col-span-5 mt-16 text-reveal-block">
//                      <h2 className="text-2xl font-bold text-cyan-400 mb-4 tracking-wide">Built for Scale</h2>
//                     <p className="text-gray-300 leading-relaxed text-lg">
//                         Leveraging the power of Next.js and TypeScript, Sentinel.ai offers a resilient, scalable, and type-safe architecture. Our platform is engineered for high-concurrency environments, ensuring a seamless and reliable testing experience for thousands of users simultaneously.
//                     </p>
//                 </div>

//                 <div className="col-span-12 md:col-span-6 md:col-start-7 mt-16 media-parallax-block">
//                      <div className="relative aspect-square bg-black/30 border border-gray-800 rounded-lg p-4 flex items-end shadow-2xl shadow-cyan-500/10">
//                         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/10 to-transparent rounded-r-lg"></div>
//                         <p className="font-mono text-sm text-cyan-400 z-10">// SENTINEL_ARCHITECTURE_BLUEPRINT</p>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

















// 'use client';

// import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// // Helper component: AnimatedText
// const AnimatedText = ({ text, className }: { text: string; className?: string }) => (
//   <span className={className}>
//     {text.split('').map((char, i) => (
//       <span key={i} className="inline-block overflow-hidden char-reveal">
//         {char === ' ' ? '\u00A0' : char}
//       </span>
//     ))}
//   </span>
// );

// export default function AboutSection() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // --- Headline Animation ---
//       gsap.from('.main-headline-char', {
//         y: 150,
//         opacity: 0,
//         stagger: 0.02,
//         duration: 1.2,
//         ease: 'power4.out',
//       });

//       // --- Info Blocks ---
//       gsap.from('.info-block', {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.2,
//         ease: 'power3.out',
//         scrollTrigger: {
//           trigger: '.info-block',
//           start: 'top 80%',
//         },
//       });

//       // --- Media Blocks ---
//       const mediaBlocks = gsap.utils.toArray('.media-block');
//       mediaBlocks.forEach((block: any) => {
//         const media = block.querySelector('.media-content');
//         const wipe = block.querySelector('.media-wipe');

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: block,
//             start: 'top 80%',
//           },
//         });

//         tl.fromTo(wipe, { x: '-100%' }, { x: '100%', duration: 1.2, ease: 'power3.inOut' });
//         tl.from(media, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.8');

//         // Parallax effect
//         gsap.to(media, {
//           y: '15%',
//           ease: 'none',
//           scrollTrigger: {
//             trigger: block,
//             start: 'top bottom',
//             end: 'bottom top',
//             scrub: true,
//           },
//         });
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative font-sans text-white py-32 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
//     >
//       <div className="max-w-7xl mx-auto flex flex-col gap-24">
//         {/* Headline */}
//         <div className="overflow-hidden">
//           <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-tight">
//             {"Redefining Integrity in the Digital Age.".split(' ').map((word, i) => (
//               <span key={i} className="inline-block overflow-hidden pr-3">
//                 {word.split('').map((char, j) => (
//                   <span key={j} className="inline-block main-headline-char">{char}</span>
//                 ))}
//               </span>
//             ))}
//           </h1>
//         </div>

//         {/* Info + Media */}
//         <div className="grid grid-cols-12 gap-12 items-center">
//           {/* Info Block */}
//           <div className="col-span-12 lg:col-span-5 info-block space-y-6">
//             <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">
//               <AnimatedText text="The Challenge" />
//             </h2>
//             <p className="text-gray-300 text-lg leading-relaxed">
//               <AnimatedText text="Traditional assessments are vulnerable. Digital education demands a new standard of trust—a system that ensures fairness, eliminates bias, and upholds academic integrity without compromise." />
//             </p>
//           </div>

//           {/* Media Block Placeholder */}
//           <div className="col-span-12 lg:col-span-7 media-block relative rounded-xl overflow-hidden h-96 lg:h-[480px]">
//             <div className="media-wipe absolute inset-0 bg-cyan-500 z-10"></div>
//             <div className="media-content relative w-full h-full bg-gray-800/50 rounded-xl flex items-center justify-center text-cyan-400 font-mono text-lg">
//               {/* Insert image/video here */}
//               MEDIA PLACEHOLDER
//             </div>
//           </div>
//         </div>

//         {/* Second Section */}
//         <div className="grid grid-cols-12 gap-12 items-center">
//           {/* Media */}
//           <div className="col-span-12 lg:col-span-6 media-block relative rounded-xl overflow-hidden h-80 lg:h-[400px]">
//             <div className="media-wipe absolute inset-0 bg-cyan-500 z-10"></div>
//             <div className="media-content relative w-full h-full bg-gray-800/50 rounded-xl flex items-center justify-center text-cyan-400 font-mono text-lg">
//               MEDIA PLACEHOLDER
//             </div>
//           </div>

//           {/* Info */}
//           <div className="col-span-12 lg:col-span-5 lg:col-start-7 info-block space-y-6">
//             <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">
//               <AnimatedText text="Intelligent Monitoring" />
//             </h2>
//             <p className="text-gray-300 text-lg leading-relaxed">
//               <AnimatedText text="Our AI analyzes video, audio, and on-screen activity in real-time, identifying potential academic integrity violations with accuracy. Robust, non-intrusive proctoring respects user privacy." />
//             </p>
//           </div>
//         </div>

//         {/* Third Section */}
//         <div className="grid grid-cols-12 gap-12 items-center">
//           <div className="col-span-12 lg:col-span-5 info-block space-y-6">
//             <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">
//               <AnimatedText text="Built for Scale" />
//             </h2>
//             <p className="text-gray-300 text-lg leading-relaxed">
//               <AnimatedText text="Leveraging Next.js and TypeScript, Sentinel.ai offers a resilient, scalable, type-safe architecture, handling thousands of concurrent users with seamless reliability." />
//             </p>
//           </div>

//           <div className="col-span-12 lg:col-span-6 lg:col-start-7 media-block relative rounded-xl overflow-hidden h-80 lg:h-[400px]">
//             <div className="media-wipe absolute inset-0 bg-cyan-500 z-10"></div>
//             <div className="media-content relative w-full h-full bg-gray-800/50 rounded-xl flex items-center justify-center text-cyan-400 font-mono text-lg">
//               MEDIA PLACEHOLDER
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



















'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CenterVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Robotic background subtle animation
      if(bgRef.current) {
        gsap.to(bgRef.current, {
          backgroundPosition: "200% 0",
          duration: 120,
          repeat: -1,
          ease: "linear",
        });
      }

      // Headline animation
      gsap.from('.main-headline-char', {
        y: '150%',
        skewY: 10,
        opacity: 0,
        stagger: 0.03,
        duration: 1,
        ease: 'power4.out',
      });

      // Video fade-in and scale
      gsap.from('.media-block', {
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: 'power3.out',
      });

      // Description words staggered animation
      gsap.from('.desc-word', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power4.out',
        delay: 0.5,
      });

      // Paragraph fade-in with scroll
      gsap.from('.desc-para', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.desc-para',
          start: 'top 80%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen text-white flex flex-col items-center justify-start overflow-hidden px-6 sm:px-12 py-32">
      
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 bg-[url('/robotic-grid.svg')] bg-repeat-x bg-[length:200%_auto] opacity-20"
      ></div>

      {/* Headline */}
      <h1 className="text-[6rem] sm:text-[10rem] font-bold leading-[1.05] tracking-tight  text-center mb-20">
        {"Redefining Integrity in the Digital Age.".split(' ').map((word, i) => (
          <span key={i} className="inline-block pr-4 ">
            {word.split('').map((char, j) => (
              <span key={j} className="inline-block main-headline-char">{char}</span>
            ))}
          </span>
        ))}
      </h1>

      {/* Video / Media block */}
      {/* <div className="media-block relative w-full max-w-5xl h-[37rem] bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center mt-20 mb-12">
        <div className="absolute inset-0 bg-cyan-500/10"></div>
        <span className="text-gray-400 font-mono">VIDEO PLACEHOLDER</span>
      </div> */}


      <div className="media-block relative w-full max-w-5xl h-[37rem] bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center mt-20 mb-12">
  <div className="absolute inset-0 bg-cyan-500/10"></div>
  
  <video
    src="/video.mp4"
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover rounded-xl"
  >
    <source src="/video.mp4" type="video/mp4" />
  </video>
</div>


      

      {/* 40-word paragraph */}
      <p className=" max-w-3xl text-center text-lg text-gray-300 ">
        Sentinel.ai leverages cutting-edge AI to monitor, analyze, and ensure academic integrity seamlessly. Our platform is non-intrusive, scalable, and precise, offering a trusted solution that empowers digital learning while safeguarding fairness and transparency across assessments.
      </p>
    </section>
  );
}
