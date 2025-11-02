'use client';

import React from 'react';
import { InfoIcon } from '../components/Icons';

interface InstructionsStageProps {
    test: { title: string; duration: number; questions: { _id: string; questionText: string; options: string[] }[] };
    handleProceedToVerification: () => void;
}

const InstructionsStage: React.FC<InstructionsStageProps> = ({ test, handleProceedToVerification }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-sentinel-animated p-4 font-sans text-white">
            <div className="w-full max-w-3xl mx-auto animate-fadeInUp">
                <div className="relative bg-black/70 border border-cyan-800/50 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 backdrop-blur-xl">
                    <div className="absolute -top-px -left-px -right-px h-1/2 rounded-t-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent"></div>
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">{test.title}</h1>
                        <p className="text-cyan-400 mt-2">Assessment Instructions</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center my-8 text-lg">
                        <p className="bg-cyan-900/20 border border-cyan-800/30 rounded-lg py-3"><span className="font-bold text-gray-400 block text-sm">Duration</span> {test.duration} Minutes</p>
                        <p className="bg-cyan-900/20 border border-cyan-800/30 rounded-lg py-3"><span className="font-bold text-gray-400 block text-sm">Questions</span> {test.questions.length}</p>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                        <h2 className="font-semibold text-xl mb-3 flex items-center"><InfoIcon /> Important Rules</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>This is a remotely proctored exam. Your webcam and microphone will be monitored.</li>
                            <li>You must complete an identity verification step before starting.</li>
                            <li>Ensure you have a stable and uninterrupted internet connection.</li>
                            <li>Switching tabs or opening other applications is strictly prohibited and will be flagged.</li>
                        </ul>
                    </div>
                    <button onClick={handleProceedToVerification} className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
                        Proceed to Verification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstructionsStage;
