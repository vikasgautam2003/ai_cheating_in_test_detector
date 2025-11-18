'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServerIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={className}>
    <rect x="2" y="2" width="20" height="8" rx="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);

const BrainIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default function SentinelLoader({ onReady }: { onReady: () => void }) {
  const [serverAwake, setServerAwake] = useState(false);
  const [aiAwake, setAiAwake] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const pingServer = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
        if (res.ok) setServerAwake(true);
      } catch {}
    };

    const pingAI = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}/`);
        if (res.ok) setAiAwake(true);
      } catch {}
    };

    if (!serverAwake) pingServer();
    if (!aiAwake) pingAI();

    const sInt = setInterval(() => { if (!serverAwake) pingServer(); }, 2000);
    const aInt = setInterval(() => { if (!aiAwake) pingAI(); }, 2000);

    return () => {
      clearInterval(sInt);
      clearInterval(aInt);
    };
  }, [serverAwake, aiAwake]);

  useEffect(() => {
    if (serverAwake && aiAwake) {
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(() => onReady(), 800);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [serverAwake, aiAwake, onReady]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] text-cyan-500 font-mono overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8 }
          }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]"
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="relative mb-12">
            <motion.div
              className="w-32 h-32 border-2 border-cyan-500/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-2 left-2 w-28 h-28 border-t-2 border-b-2 border-cyan-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest mb-2">
            SENTINEL.AI
          </h1>

          <motion.p
            className="text-sm text-cyan-500/70 mb-10 uppercase tracking-[0.2em]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            System Initialization Sequence
          </motion.p>

          <div className="flex flex-col gap-4 w-80">
            <StatusRow label="Core Relay Node" isAwake={serverAwake} icon={<ServerIcon className="w-5 h-5" />} />
            <StatusRow label="Neural Vision Engine" isAwake={aiAwake} icon={<BrainIcon className="w-5 h-5" />} />
          </div>

          <div className="absolute bottom-10 text-xs text-cyan-800 text-center max-w-md px-4 leading-relaxed">
            <p>Secure connection requires waking dormant cloud instances.</p>
            <p>Estimated wait time: 10-50 seconds.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusRow({ label, isAwake, icon }: { label: string; isAwake: boolean; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between bg-cyan-950/30 border border-cyan-900/50 rounded-lg p-3 backdrop-blur-sm">
      <div className="flex items-center gap-3 text-cyan-400">
        {icon}
        <span className="text-sm font-semibold tracking-wide">{label}</span>
      </div>
      <div className="flex items-center">
        {isAwake ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-green-400"
          >
            <span className="text-xs font-bold">ONLINE</span>
            <CheckIcon className="w-4 h-4" />
          </motion.div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-cyan-700 animate-pulse">BOOTING...</span>
            <motion.div
              className="w-2 h-2 bg-cyan-700 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
