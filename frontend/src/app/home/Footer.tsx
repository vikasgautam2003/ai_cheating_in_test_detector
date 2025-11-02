'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';

// --- SVG Icons for Social Links ---
const GithubIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
const TwitterIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;
const LinkedInIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 0 1 2.063-2.065 2.064 2.064 0 0 1 2.063 2.065c0 1.138-.925 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>;


// --- Global Styles Component for the animated background ---
const GlobalFooterStyles = () => (
    <style jsx global>{`
        @keyframes backgroundPan {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .bg-sentinel-footer {
            background-color: #020617;
            background-image: linear-gradient(rgba(0, 180, 255, 0.05) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(0, 180, 255, 0.05) 1px, transparent 1px);
            background-size: 2rem 2rem;
            background-position: center center;
        }
        .footer-glow {
            background: radial-gradient(400px circle at var(--x) var(--y), rgba(6, 182, 212, 0.2), transparent 40%);
        }
    `}</style>
);

export default function GodlyFooter() {
    // --- Logic for the interactive mouse spotlight ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <>
            <GlobalFooterStyles />
            <motion.footer 
                onMouseMove={handleMouseMove}
                className="relative w-full bg-sentinel-footer text-gray-400 p-8 sm:p-12 lg:p-20 overflow-hidden"
            >
                {/* The interactive spotlight effect */}
                <motion.div 
                    className="footer-glow absolute inset-0 pointer-events-none"
                    style={{
                        background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.15), transparent 50%)`
                    }}
                />

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
                    {/* --- Column 1: Brand and Heartbeat --- */}
                    <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center space-x-3">
                            <motion.span 
                                className="bg-cyan-500 w-4 h-4 rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <h2 className="text-3xl font-bold text-white">Sentinel.ai</h2>
                        </div>
                        <p className="mt-4 text-sm max-w-xs">
                            Redefining academic integrity and providing a fair, secure testing environment for the digital age.
                        </p>
                    </div>

                    {/* --- Column 2: Page Navigation --- */}
                    <div className="md:col-span-2">
                        <h3 className="font-semibold text-white tracking-wider">Navigation</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">The Protocol</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">System Queries (FAQ)</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Get Started</a></li>
                        </ul>
                    </div>

                    {/* --- Column 3: Legal/Resources --- */}
                    <div className="md:col-span-3">
                         <h3 className="font-semibold text-white tracking-wider">Resources</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                             <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Support</a></li>
                        </ul>
                    </div>
                    
                    {/* --- Column 4: Social Links --- */}
                     <div className="md:col-span-3">
                        <h3 className="font-semibold text-white tracking-wider">Connect with Us</h3>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="w-8 h-8 hover:text-cyan-400 transition-colors fill-current"><TwitterIcon /></a>
                            <a href="#" className="w-8 h-8 hover:text-cyan-400 transition-colors fill-current"><GithubIcon /></a>
                            <a href="#" className="w-8 h-8 hover:text-cyan-400 transition-colors fill-current"><LinkedInIcon /></a>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-cyan-500/10 text-center text-xs font-mono tracking-widest relative z-10">
                    <p>&copy; {new Date().getFullYear()} SENTINEL.AI :: SYSTEM_STATUS: NOMINAL :: ALL RIGHTS RESERVED</p>
                </div>
            </motion.footer>
        </>
    );
}