'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register the ScrollTrigger and useGSAP hook
gsap.registerPlugin(ScrollTrigger, useGSAP);

// --- SVG Icons for each step ---
const RegisterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>;
const VerifyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const AssessIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>;
const AnalyzeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>;

// --- Helper component for the animated headline ---
const AnimatedWords = ({ title }: { title: string }) => {
    return (
        <h1 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter overflow-hidden">
            {title.split(" ").map((word, index) => (
                <span key={index} className="inline-block overflow-hidden pr-2 sm:pr-4">
                    {word.split("").map((char, charIndex) => (
                       <span key={charIndex} className="inline-block main-headline-char">{char}</span>
                    ))}
                </span>
            ))}
        </h1>
    );
};

export default function WhyUsSection() {
    const mainRef = useRef(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        // --- Animate the main headline on load ---
        gsap.from(".main-headline-char", {
            yPercent: 120,
            stagger: 0.03,
            duration: 1,
            ease: 'power4.out',
            delay: 0.2
        });

        // --- Animate the flow line and steps on scroll ---
        const steps = gsap.utils.toArray('.protocol-step');
        const path = svgRef.current?.querySelector('path');

        if (!path) return;

        const pathLength = path.getTotalLength();
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        // Master timeline for the entire scroll sequence
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1, // Smoothly scrub through the animation
            }
        });

        // Animate the SVG line drawing itself
        tl.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
        });

        // Animate each step as the line reaches it
        steps.forEach((step: any, index) => {
            tl.from(step, {
                opacity: 0,
                y: 50,
                ease: 'power3.out'
            }, `-=${0.7 - index * 0.1}`); // Overlap animations for a smoother flow
        });

    }, { scope: mainRef });

    return (
        <section ref={mainRef} className="font-sans text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <AnimatedWords title="A Protocol Built on Trust." />
                </div>

                <div className="relative">
                    {/* --- The SVG Line that will be animated --- */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex justify-center">
                        <svg ref={svgRef} width="4" height="100%" viewBox="0 0 4 1200" preserveAspectRatio="none">
                            <path d="M 2 0 L 2 1200" stroke="#06b6d4" strokeWidth="4" fill="none" />
                        </svg>
                    </div>

                    <div className="space-y-32">
                        {/* --- Step 1: Secure Registration --- */}
                        <div className="protocol-step grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="md:text-right">
                                <div className="inline-block text-left bg-black/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-lg shadow-2xl shadow-cyan-500/5">
                                    <h3 className="text-2xl font-bold text-cyan-400 mb-2 tracking-wide">Secure Registration</h3>
                                    <p className="text-gray-300 leading-relaxed">Begin with a seamless and encrypted onboarding process. Your data is protected from the very first click, establishing a secure foundation for every assessment.</p>
                                </div>
                            </div>
                            <div className="md:pl-16 relative">
                                <div className="absolute left-[-1.35rem] md:left-[-4.35rem] top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center ring-8 ring-slate-900">
                                    <RegisterIcon />
                                </div>
                            </div>
                        </div>

                        {/* --- Step 2: System Verification --- */}
                        <div className="protocol-step grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="md:pr-16 relative order-last md:order-first">
                                <div className="absolute right-[-1.35rem] md:right-[-4.35rem] top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center ring-8 ring-slate-900">
                                    <VerifyIcon />
                                </div>
                            </div>
                            <div className="md:order-last">
                                <div className="inline-block text-left bg-black/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-lg shadow-2xl shadow-cyan-500/5">
                                    <h3 className="text-2xl font-bold text-cyan-400 mb-2 tracking-wide">System Verification</h3>
                                    <p className="text-gray-300 leading-relaxed">Our AI performs a rapid, automated check of your webcam, microphone, and network stability. This pre-flight check ensures a smooth, uninterrupted testing environment.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* --- Step 3: Proctored Assessment --- */}
                        <div className="protocol-step grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                             <div className="md:text-right">
                                <div className="inline-block text-left bg-black/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-lg shadow-2xl shadow-cyan-500/5">
                                    <h3 className="text-2xl font-bold text-cyan-400 mb-2 tracking-wide">Proctored Assessment</h3>
                                    <p className="text-gray-300 leading-relaxed">Engage with your test in a secure, monitored environment. Our non-intrusive AI works silently in the background, ensuring academic integrity without causing distraction or anxiety.</p>
                                </div>
                            </div>
                             <div className="md:pl-16 relative">
                                <div className="absolute left-[-1.35rem] md:left-[-4.35rem] top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center ring-8 ring-slate-900">
                                    <AssessIcon />
                                </div>
                            </div>
                        </div>

                        {/* --- Step 4: Instant Analysis --- */}
                        <div className="protocol-step grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="md:pr-16 relative order-last md:order-first">
                                <div className="absolute right-[-1.35rem] md:right-[-4.35rem] top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center ring-8 ring-slate-900">
                                    <AnalyzeIcon />
                                </div>
                            </div>
                             <div className="md:order-last">
                                <div className="inline-block text-left bg-black/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-lg shadow-2xl shadow-cyan-500/5">
                                    <h3 className="text-2xl font-bold text-cyan-400 mb-2 tracking-wide">Instant Analysis</h3>
                                    <p className="text-gray-300 leading-relaxed">The moment you submit, your results and proctoring report are generated. Receive immediate, transparent feedback on your performance and the integrity of your session.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}