'use client';

import React, { useState } from 'react';
import SceneHeader from '@/components/SceneHeader';
import { contrastData } from '@/data/simulationData';
import SimulationControlBar from '@/components/v2/SimulationControlBar';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useSimulation } from '@/context/SimulationContext';

export default function Scene7ContrastV2() {
    const { nextScene, prevScene, goToScene } = useSimulation();
    const [stage, setStage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-scroll refs
    const step1Ref = useAutoScroll<HTMLDivElement>(stage === 1); // Timeline
    const step2Ref = useAutoScroll<HTMLDivElement>(stage === 2); // Before/After
    const step3Ref = useAutoScroll<HTMLDivElement>(stage === 3); // Impact
    const step4Ref = useAutoScroll<HTMLDivElement>(stage === 4); // Key Takeaway

    const totalSteps = 4;

    const handleNext = async () => {
        if (stage >= totalSteps) return;

        setIsAnimating(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setStage(prev => prev + 1);
        setIsAnimating(false);
    };

    const handlePrev = () => {
        if (stage > 0) setStage(prev => prev - 1);
    };

    const handleReset = () => {
        setStage(0);
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            <div className="max-w-5xl mx-auto px-6 py-8 pb-32">
                <SceneHeader
                    title="The Contrast: Alpha Generation"
                    subtitle="From Manual Bottlenecks to Agentic Scale"
                />

                {/* Latency Timeline Visual */}
                <div ref={step1Ref} className={`bg-white rounded-2xl border border-gray-200 p-8 mb-8 transition-all duration-700 ${stage >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">The Latency Advantage</h3>
                    <div className="relative pt-8 pb-4">
                        {/* Timeline Line */}
                        <div className="absolute top-12 left-0 right-0 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-[10%] h-full bg-green-500" />
                            <div className="absolute left-[10%] right-0 h-full bg-red-100" />
                        </div>

                        {/* Timeline Points */}
                        <div className="relative flex justify-between text-sm">
                            <div className="flex flex-col items-center -ml-4">
                                <span className="text-xl mb-2">📅</span>
                                <span className="font-bold text-gray-800">Day 1</span>
                                <span className="text-gray-500">Month End</span>
                            </div>
                            <div className={`flex flex-col items-center transition-all duration-500 ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ left: '10%', position: 'absolute' }}>
                                <div className="w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-sm mb-2 z-10" />
                                <span className="font-bold text-green-600">Day 4</span>
                                <span className="text-green-600 font-medium">AI Insight</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xl mb-2">🐌</span>
                                <span className="font-bold text-gray-400">3+ Weeks</span>
                                <span className="text-red-400">Traditional View</span>
                            </div>
                        </div>

                        {/* Annotation */}
                        <div className={`absolute top-0 left-[12%] bg-green-50 border border-green-200 text-green-800 text-xs px-3 py-1 rounded-full transition-all duration-700 delay-500 ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            Weeks of Bottlenecks Eliminated
                        </div>
                    </div>
                </div>

                {/* Before/After Comparison */}
                <div ref={step2Ref} className={`grid grid-cols-2 gap-8 mb-8 transition-all duration-700 delay-100 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Before */}
                    <div className="bg-red-50 rounded-2xl border-2 border-red-200 overflow-hidden">
                        <div className="bg-red-100 border-b border-red-200 px-6 py-4">
                            <h3 className="text-xl font-bold text-red-800 flex items-center gap-2">
                                <span>😓</span> Without This System
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {contrastData.before.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-red-100">
                                    <span className="text-3xl">{item.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{item.metric}</p>
                                        <p className="text-lg font-semibold text-red-700">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* After */}
                    <div className="bg-green-50 rounded-2xl border-2 border-green-200 overflow-hidden">
                        <div className="bg-green-100 border-b border-green-200 px-6 py-4">
                            <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                                <span>🚀</span> With AI-Augmented System
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {contrastData.after.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-green-100">
                                    <span className="text-3xl">{item.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{item.metric}</p>
                                        <p className="text-lg font-semibold text-green-700">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Impact Summary */}
                <div ref={step3Ref} className={`bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 text-white mb-8 shadow-xl transition-all duration-700 delay-200 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">The Investor Upside</h3>
                        <p className="text-blue-200">Systemic Risk Reduction & Yield Protection</p>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold mb-2 text-green-400">Zero</p>
                            <p className="text-sm text-blue-200">Day Latency</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold mb-2">100%</p>
                            <p className="text-sm text-blue-200">Portfolio Coverage</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold mb-2">Day 4</p>
                            <p className="text-sm text-blue-200">Fraud Detection</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold mb-2 text-purple-400">Supervised</p>
                            <p className="text-sm text-blue-200">Autonomy Achieved</p>
                        </div>
                    </div>
                </div>

                {/* Key Principles */}
                <div ref={step4Ref} className={`bg-white rounded-2xl border border-gray-200 p-8 mb-8 transition-all duration-700 delay-300 ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">The Guiding Principles</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold">1</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Source Systems Are Truth</h4>
                                <p className="text-sm text-gray-500">PMS, POS, Bank, STR—not borrower spreadsheets</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold">2</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Standardization Is Control</h4>
                                <p className="text-sm text-gray-500">USALI alignment enforced by system, not borrower</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold">3</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Latency Is Risk</h4>
                                <p className="text-sm text-gray-500">Compressing time-to-insight protects the asset</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold">4</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Humans Decide, Machines Prepare</h4>
                                <p className="text-sm text-gray-500">AI surfaces exceptions; humans keep the keys</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <div className="inline-block bg-gray-100 rounded-full px-6 py-3 mb-6">
                            <p className="text-gray-600">
                                🎬 You&apos;ve just experienced the future of lending intelligence
                            </p>
                        </div>
                    </div>
                </div>

                <SimulationControlBar
                    currentStep={stage}
                    totalSteps={totalSteps}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onReset={handleReset}
                    onFinish={nextScene}
                    onBack={prevScene}
                    isAnimating={isAnimating}
                    finishLabel="Continue"
                />
            </div>
        </div>
    );
}
