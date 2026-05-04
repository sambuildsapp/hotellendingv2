'use client';

import React, { useState } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AgentCard from '@/components/AgentCard';
import { dscrCalculation, loanData } from '@/data/simulationData';
import SimulationControlBar from '@/components/v2/SimulationControlBar';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useSimulation } from '@/context/SimulationContext';

export default function Scene5WatchdogV2() {
    const { nextScene, prevScene } = useSimulation();
    const [stage, setStage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-scroll refs
    const step1Ref = useAutoScroll<HTMLDivElement>(stage === 1); // Agent
    const step2Ref = useAutoScroll<HTMLDivElement>(stage === 2); // Covenant Check
    const step3Ref = useAutoScroll<HTMLDivElement>(stage === 3); // Calculation
    const step4Ref = useAutoScroll<HTMLDivElement>(stage === 4); // Result

    const totalSteps = 4;

    const handleNext = async () => {
        if (stage >= totalSteps) return;

        setIsAnimating(true);

        // "Magic" Delays
        const delay = stage === 2 ? 1500 : // Reading loan agreement
            stage === 3 ? 1200 : // Calculating
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
            <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
                <SceneHeader
                    title="The Watchdog"
                    subtitle="Covenant Compliance & Risk"
                />

                <div className="space-y-6">
                    {/* Agent Card */}
                    <div ref={step1Ref}>
                        <AgentCard
                            name="Compliance Agent"
                            icon="⚖️"
                            status={stage === 0 ? 'idle' : stage < 4 ? 'working' : 'complete'}
                            description="Validates financial health against loan agreement"
                        >
                            {stage >= 1 && (
                                <div className="text-sm text-gray-600 animate-fade-in">
                                    {stage === 1 && <p>📄 Retrieving Loan Agreement {loanData.loanId}...</p>}
                                    {stage === 2 && <p>🔍 Extracting Covenant Requirements (DSCR)...</p>}
                                    {stage === 3 && <p>🧮 Calculating current verified DSCR...</p>}
                                    {stage === 4 && <p>✅ Compliance Check Passed.</p>}
                                </div>
                            )}
                        </AgentCard>
                    </div>

                    {/* Loan Agreement Callout */}
                    <div ref={step2Ref} className={`bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all duration-500 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl">📜</span>
                            <h4 className="font-semibold text-slate-800">Digital Loan Agreement</h4>
                        </div>
                        <div className="text-sm font-mono bg-white p-3 rounded border border-slate-100 text-slate-600">
                            &quot;Borrower shall maintain a minimum Debt Service Coverage Ratio (DSCR) of
                            <span className="font-bold text-blue-600"> {loanData.covenants.minDSCR}x</span> tested monthly.&quot;
                        </div>
                    </div>

                    {/* Calculation Visual */}
                    <div ref={step3Ref} className={`grid grid-cols-3 gap-4 transition-all duration-500 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                            <p className="text-xs text-uppercase text-gray-500 mb-1">Annualized NOI</p>
                            <p className="font-bold text-lg text-gray-800">${dscrCalculation.annualizedNOI.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center justify-center text-gray-400 font-bold text-xl">÷</div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                            <p className="text-xs text-uppercase text-gray-500 mb-1">Annual Debt Service</p>
                            <p className="font-bold text-lg text-gray-800">${dscrCalculation.annualDebtService.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Result */}
                    <div ref={step4Ref} className={`bg-emerald-50 border border-emerald-200 rounded-xl p-6 transition-all duration-500 ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <span className="text-3xl">🛡️</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-emerald-900">Covenant Satisfied</h3>
                                    <p className="text-emerald-700">Current DSCR: <strong>{dscrCalculation.dscr}x</strong> (Min: {loanData.covenants.minDSCR}x)</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-block px-4 py-1 bg-emerald-200 text-emerald-800 rounded-full font-bold text-sm">
                                    PASS
                                </span>
                                <p className="text-xs text-emerald-600 mt-2">Verified in 450ms</p>
                            </div>
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
                />
            </div>
        </div>
    );
}
