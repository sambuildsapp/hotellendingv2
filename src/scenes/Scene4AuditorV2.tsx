'use client';

import React, { useState } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AgentCard from '@/components/AgentCard';
import MCPPanel from '@/components/MCPPanel';
import { bankData, strData } from '@/data/simulationData';
import SimulationControlBar from '@/components/v2/SimulationControlBar';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useSimulation } from '@/context/SimulationContext';

export default function Scene4AuditorV2() {
    const { nextScene, prevScene } = useSimulation();
    const [stage, setStage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-scroll refs
    const step1Ref = useAutoScroll<HTMLDivElement>(stage === 1); // Agent
    const step2Ref = useAutoScroll<HTMLDivElement>(stage === 2); // Bank Data
    const step3Ref = useAutoScroll<HTMLDivElement>(stage === 3); // STR Data
    const step4Ref = useAutoScroll<HTMLDivElement>(stage === 4); // Triangulation/variance
    const step5Ref = useAutoScroll<HTMLDivElement>(stage === 5); // Adaptive Logic

    const totalSteps = 5;

    const handleNext = async () => {
        if (stage >= totalSteps) return;

        setIsAnimating(true);

        // "Magic" Delays
        const delay = stage === 4 ? 1500 : // Triangulation takes longer
            1000;

        await new Promise(resolve => setTimeout(resolve, delay));

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
                    title="The Pragmatic Auditor"
                    subtitle="Adaptive Verification & Noise Reduction"
                    day="Day 4 — Immediate"
                />

                <div className="space-y-6">
                    {/* Agent Card */}
                    <div ref={step1Ref}>
                        <AgentCard
                            name="Verification Agent"
                            icon="✅"
                            status={stage === 0 ? 'idle' : stage < 5 ? 'working' : 'complete'}
                            description="Triangulates data and discounts seasonal noise"
                        >
                            {stage === 1 && <p className="text-sm text-gray-600">🏦 Fetching Bank Data... (Confidence: 70%)</p>}
                            {stage === 2 && <p className="text-sm text-gray-600">✔️ Bank data matched. (Confidence: 90%)</p>}
                            {stage === 3 && <p className="text-sm text-gray-600">📊 Fetching STR Market Data... (Confidence: 90%)</p>}
                            {stage === 4 && <p className="text-sm text-amber-600">⚠️ Discrepancy found: RevPAR -5% vs Comp Set.</p>}
                            {stage === 5 && <p className="text-sm text-green-600">✅ Auto-Resolved: Matches 3-year seasonal pattern. (Confidence: 98%)</p>}
                        </AgentCard>
                    </div>

                    {/* Three Column Comparison */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Reported Data */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 opacity-50">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xl">📄</span>
                                <h3 className="font-semibold text-gray-800">Reported</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Revenue</span>
                                    <span className="font-mono">$810,000</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Occupancy</span>
                                    <span className="font-mono">72.4%</span>
                                </div>
                            </div>
                        </div>

                        {/* Bank Data */}
                        <div ref={step2Ref} className={`bg-white rounded-xl border border-gray-200 shadow-sm p-4 transition-all duration-500 ${stage >= 2 ? 'opacity-100 ring-2 ring-blue-500' : 'opacity-30 grayscale'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xl">🏦</span>
                                <h3 className="font-semibold text-gray-800">Bank Data</h3>
                            </div>
                            {stage >= 2 ? (
                                <div className="space-y-2 animate-fade-in">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Deposits</span>
                                        <span className="font-mono text-blue-600">${bankData.totalDeposits.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Variance</span>
                                        <span className="font-mono text-green-600">1.95%</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-12 flex items-center justify-center text-gray-400 text-sm">
                                    Waiting for bank feed...
                                </div>
                            )}
                        </div>

                        {/* STR Data */}
                        <div ref={step3Ref} className={`bg-white rounded-xl border border-gray-200 shadow-sm p-4 transition-all duration-500 ${stage >= 3 ? 'opacity-100 ring-2 ring-purple-500' : 'opacity-30 grayscale'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xl">📊</span>
                                <h3 className="font-semibold text-gray-800">Market Data</h3>
                            </div>
                            {stage >= 3 ? (
                                <div className="space-y-2 animate-fade-in">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Mkt Occ</span>
                                        <span className="font-mono text-purple-600">{strData.compSet.occupancy}%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">RPI</span>
                                        <span className="font-mono text-green-600">{strData.index.revpar}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-12 flex items-center justify-center text-gray-400 text-sm">
                                    Waiting for STR...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MCP Panels */}
                    {/* These panels are removed as per the new structure */}

                    {/* Adaptive Resolution Logic */}
                    {stage >= 5 && (
                        <div ref={step5Ref} className="bg-green-50 border border-green-300 rounded-xl p-6 animate-fade-in">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl">🧠</span>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-3">Adaptive Logic: Noise Discounted</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white rounded-lg p-4 border border-green-200">
                                            <p className="text-sm text-gray-500 mb-1">Flagged Issue</p>
                                            <p className="text-lg font-semibold text-amber-600">
                                                RevPAR Lag (-5%)
                                            </p>
                                            <p className="text-xs text-gray-500">Normally a risk signal</p>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-green-200">
                                            <p className="text-sm text-gray-500 mb-1">AI Resolution</p>
                                            <p className="text-lg font-semibold text-green-600">
                                                Seasonality Match
                                            </p>
                                            <p className="text-xs text-gray-500">Historical pattern confirms Jan drop is normal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                />
            </div>
        </div>
    );
}
