'use client';

import React from 'react';
import SceneHeader from '@/components/SceneHeader';
import { useSimulation } from '@/context/SimulationContext';
import SimulationControlBar from '@/components/v2/SimulationControlBar';

export default function Scene8About() {
    const { goToScene, prevScene } = useSimulation();

    return (
        <div className="">
            {/* Reduced top padding and removed min-h-screen to ensure header visibility */}
            <div className="max-w-6xl mx-auto px-6 pt-4 pb-64">
                <SceneHeader
                    title="Thank You"
                    subtitle=""
                />

                <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden mt-4 animate-fade-in relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left Side: Profile */}
                        <div className="p-16 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100">
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden mb-10 border-8 border-blue-50 shadow-inner">
                                <img 
                                    src="/about-me.jpg" 
                                    alt="Sameer Sanghavi" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sameer";
                                    }}
                                />
                            </div>
                            <h3 className="text-5xl font-black text-slate-900 mb-4">Sameer Sanghavi</h3>
                            <p className="text-blue-600 font-bold mb-8 text-2xl">Founder / CTO at Pivot Drive Inc</p>
                            <div className="bg-slate-100 px-8 py-3 rounded-full">
                                <p className="text-blue-900 text-sm font-bold tracking-widest">
                                    AgEx: dBase3+ to Antigravity
                                </p>
                            </div>
                        </div>

                        {/* Right Side: QR */}
                        <div className="p-16 bg-slate-50/50 flex flex-col items-center justify-center">
                            <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-200 max-w-[400px] w-full">
                                <img 
                                    src="/linkedin-qr.png" 
                                    alt="LinkedIn QR Code" 
                                    className="w-full aspect-square object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://www.linkedin.com/in/sameersanghavi";
                                    }}
                                />
                                <p className="text-center text-xs text-slate-400 font-black uppercase tracking-[0.2em] mt-8">
                                    Scan to Connect
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Control Bar is fixed to bottom by its component definition, 
                    so we just need enough pb-64 above to avoid overlap */}
                <SimulationControlBar
                    currentStep={1}
                    totalSteps={1}
                    onNext={() => window.location.href = '/presentation'}
                    onPrev={() => prevScene()}
                    onReset={() => window.location.href = '/presentation'}
                    onFinish={() => window.location.href = '/presentation'}
                    onBack={prevScene}
                    isAnimating={false}
                    finishLabel="Restart Presentation"
                />
            </div>
        </div>
    );
}
