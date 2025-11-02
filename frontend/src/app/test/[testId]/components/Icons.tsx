'use client';

import React from 'react';

export const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" 
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
       className="w-6 h-6 inline-block mr-2 text-cyan-400">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" 
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
       className="w-10 h-10 text-cyan-400">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);


// CheckCircleIcon.tsx
export const CheckCircleIcon = ({ size = 24, color = "#10B981" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke={color}
    width={size}
    height={size}
    className="inline-block"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
    <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
  </svg>
);

// AlertTriangleIcon.tsx
export const AlertTriangleIcon = ({ size = 24, color = "#F59E0B" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke={color}
    width={size}
    height={size}
    className="inline-block"
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10.29 3.86L1.82 18a1.992 1.992 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
    />
    <line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="17" r="1" fill={color} />
  </svg>
);


export const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" 
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
       className="w-10 h-10 text-cyan-400">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

export const WarningIcon = ({ colorClass }: { colorClass: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" 
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
       className={`w-12 h-12 mx-auto mb-4 ${colorClass}`}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);
