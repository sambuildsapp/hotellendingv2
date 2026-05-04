'use client';

import React, { useState, useEffect } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AgentCard from '@/components/AgentCard';
import EmailPreview from '@/components/EmailPreview';
import { hotelData, emailTemplates } from '@/data/simulationData';
import SimulationControlBar from '@/components/v2/SimulationControlBar';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useSimulation } from '@/context/SimulationContext';

export default function Scene1TriggerV2() {
    const { nextScene, prevScene } = useSimulation();
    const [stage, setStage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-scroll refs
    const step1Ref = useAutoScroll<HTMLDivElement>(stage === 1); // Calendar
    const step2Ref = useAutoScroll<HTMLDivElement>(stage === 2); // Agent
    const step3Ref = useAutoScroll<HTMLDivElement>(stage === 3); // Email
    const step4Ref = useAutoScroll<HTMLDivElement>(stage === 4); // Key Point

    const totalSteps = 4;

    const handleNext = async () => {
        if (stage >= totalSteps) return;

        setIsAnimating(true);

        // "Magic" Delays - simulate thinking/processing
        const delay = stage === 2 ? 1500 : 800; // Longer delay for sending email

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
                    title="Immediate Activation"
                    subtitle="Eliminating the Processing Bottleneck"
                    day="Day 1 — February 1st, 9:00 AM"
                />

                <div className="space-y-6">
                    {/* Latency Context */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl opacity-60">
                            <p className="text-xs font-semibold text-red-800 uppercase tracking-wide">Traditional Method</p>
                            <p className="text-2xl font-bold text-red-900">Weeks in Processing</p>
                            <p className="text-xs text-red-700">Stuck in manual review</p>
                        </div>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm">
                            <p className="text-xs font-semibold text-green-800 uppercase tracking-wide">AI-Augmented</p>
                            <p className="text-2xl font-bold text-green-900">Decision-Ready Instantly</p>
                            <p className="text-xs text-green-700">Actionable Day 1</p>
                        </div>
                    </div>

                    {/* Calendar Trigger */}
                    <div ref={step1Ref} className={`flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 transition-opacity duration-500 ${stage >= 1 ? 'opacity-100' : 'opacity-50 blur-sm'}`}>
                        <span className="text-5xl">📅</span>
                        <div>
                            <p className="text-lg font-semibold text-gray-800">1st of the Month</p>
                            <p className="text-gray-600">Automated cycle triggers on Day 1, not Day 30</p>
                        </div>
                    </div>

                    {/* Agent Status */}
                    {stage >= 2 && (
                        <div ref={step2Ref} className="animate-fade-in">
                            <AgentCard
                                name="Collection Agent"
                                icon="📧"
                                status={stage === 2 ? 'working' : 'complete'}
                                description="Monitoring inbox and managing follow-ups"
                            >
                                {stage === 2 && <p className="text-sm text-gray-600">✏️ Drafting personalized email for {hotelData.controller.name}...</p>}
                                {stage === 3 && <p className="text-sm text-gray-600">📄 Email composed. Preparing to send...</p>}
                                {stage === 4 && <p className="text-sm text-gray-600">✅ Email sent successfully to {hotelData.controller.email}</p>}
                            </AgentCard>
                        </div>
                    )}

                    {/* Email Preview */}
                    {stage >= 3 && (
                        <div ref={step3Ref} className="animate-fade-in">
                            <EmailPreview
                                from={emailTemplates.initial.from}
                                to={hotelData.controller.email}
                                subject={emailTemplates.initial.subject}
                                body={emailTemplates.initial.body}
                                timestamp={emailTemplates.initial.timestamp}
                                isTyping={stage === 3}
                            />
                        </div>
                    )}

                    {/* Key Point */}
                    {stage >= 4 && (
                        <div ref={step4Ref} className="bg-green-50 border border-green-200 rounded-xl p-6 animate-fade-in">
                            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">💡</span>
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-2">Why This Matters</h4>
                            <p className="text-gray-600 leading-relaxed">
                                By triggering data collection immediately, we bypass the manual bottleneck. Once financials are received, you'll know about issues the very next morning, rather than waiting weeks for an analyst to parse the file.
                            </p>
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
