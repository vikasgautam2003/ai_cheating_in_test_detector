'use client';

import React, { ChangeEvent } from 'react';
import PhotoCapture from '@/app/component/proctoring/PhotoCapture';
import AudioRecorder from '@/app/component/proctoring/AudioRecorder';
import { CameraIcon, MicIcon } from './Icons';

interface VerificationStageProps {
    capturedPhoto: string | null;
    recordedAudio: Blob | null;
    loading: boolean;
    handlePhotoUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    setCapturedPhoto: (photo: string) => void;
    setRecordedAudio: (audio: Blob) => void;
    handleStartTest: () => void;
}

interface Test {
    title: string;
    questions: { _id: string; questionText: string; options: string[] }[];
    duration: number;
}

interface Props {
    test: Test;
}

const VerificationStage: React.FC<VerificationStageProps & { test: Test }> = ({
    test,
    capturedPhoto,
    recordedAudio,
    loading,
    handlePhotoUpload,
    setCapturedPhoto,
    setRecordedAudio,
    handleStartTest
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-sentinel-animated p-8 font-sans text-white">
            <div className="w-full max-w-4xl bg-black/70 border border-cyan-800/50 rounded-2xl shadow-2xl p-8 backdrop-blur-xl animate-fadeInUp">
                <h1 className="text-3xl font-bold mb-8 text-center text-white tracking-tight">Identity Verification</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center flex flex-col items-center justify-between">
                        <div className="text-center">
                            <CameraIcon />
                            <h2 className="text-xl font-semibold my-4">Photo Verification</h2>
                        </div>
                        <PhotoCapture onPhotoCaptured={setCapturedPhoto} />
                        <p className="text-center my-4 text-gray-500 font-semibold text-xs">OR</p>
                        <label className="bg-gray-700 text-gray-200 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                            Upload Photo
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </label>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center flex flex-col items-center justify-between">
                        <div className="text-center">
                            <MicIcon />
                            <h2 className="text-xl font-semibold my-4">Audio Verification</h2>
                        </div>
                        <AudioRecorder onAudioRecorded={setRecordedAudio} />
                    </div>
                </div>
                <button
                    onClick={handleStartTest}
                    disabled={!capturedPhoto || !recordedAudio || loading}
                    className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg text-lg font-bold hover:from-green-400 hover:to-emerald-500 transition-all disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:text-gray-400 transform hover:scale-105"
                >
                    {loading ? "Initializing..." : "Confirm and Begin Test"}
                </button>
            </div>
        </div>
    );
};

export default VerificationStage;
