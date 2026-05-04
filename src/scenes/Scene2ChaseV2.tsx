'use client';

import React, { useState } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AgentCard from '@/components/AgentCard';
import EmailPreview from '@/components/EmailPreview';
import { hotelData, emailTemplates } from '@/data/simulationData';
import SimulationControlBar from '@/components/v2/SimulationControlBar';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useSimulation } from '@/context/SimulationContext';

export default function Scene2ChaseV2() {
    const { nextScene, prevScene } = useSimulation();
    const [stage, setStage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-scroll refs
    const step1Ref = useAutoScroll<HTMLDivElement>(stage === 1); // Orchestrator
    const step2Ref = useAutoScroll<HTMLDivElement>(stage === 2); // Negotiator Spawn
    const step3Ref = useAutoScroll<HTMLDivElement>(stage === 3); // Email
    const step4Ref = useAutoScroll<HTMLDivElement>(stage === 4); // Response
    const step5Ref = useAutoScroll<HTMLDivElement>(stage === 5); // Dissolve

    const totalSteps = 5;

    const handleNext = async () => {
        if (stage >= totalSteps) return;

        setIsAnimating(true);

        // "Magic" Delays
        const delay = stage === 2 ? 2000 : // Spawning agent
            stage === 3 ? 1500 : // Sending email
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
                    title="Agentflows & Micro-Interactions"
                    subtitle="Ephemeral Agents Solve Edge Cases"
                    day="Day 3-4"
                />

                <div className="space-y-6">
                    {/* Timeline */}
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <div className={`flex flex-col items-center ${stage >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <span className="text-2xl">📅</span>
                            <span className="text-sm font-medium">Day 3</span>
                            <span className="text-xs">No Response</span>
                        </div>
                        <div className={`flex-1 h-1 mx-4 ${stage >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                        <div className={`flex flex-col items-center ${stage >= 4 ? 'text-green-600' : 'text-gray-400'}`}>
                            <span className="text-2xl">📨</span>
                            <span className="text-sm font-medium">Day 4</span>
                            <span className="text-xs">Response Received</span>
                        </div>
                    </div>

                    {/* Agent Topology Visual */}
                    <div ref={step1Ref} className="bg-slate-900 rounded-xl p-6 border border-slate-700 text-slate-300 mb-6 transition-all duration-500">
                        <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">Live Agent Topology</p>
                        <div className="flex items-center justify-center gap-8">
                            {/* Parent Agent */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                    <span className="text-2xl">🤖</span>
                                </div>
                                <p className="text-xs mt-2 font-mono text-blue-400">Orchestrator</p>
                            </div>

                            {/* Connection Line */}
                            <div className={`h-0.5 w-16 transition-all duration-500 ${stage >= 2 ? 'bg-blue-500' : 'bg-slate-700'}`} />

                            {/* Ephemeral Agent */}
                            <div ref={step2Ref} className={`flex flex-col items-center transition-all duration-500 ${stage >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                                <div className="w-14 h-14 bg-purple-900 rounded-full flex items-center justify-center border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-pulse">
                                    <span className="text-xl">🗣️</span>
                                </div>
                                <p className="text-xs mt-2 font-mono text-purple-400">Negotiator</p>
                                <span className="text-[10px] bg-purple-900/50 px-2 py-0.5 rounded text-purple-300 mt-1 border border-purple-800">Ephemeral</span>
                            </div>
                        </div>
                    </div>

                    {/* Agent Status */}
                    {stage >= 1 && (
                        <div ref={step2Ref} className="animate-fade-in">
                            <AgentCard
                                name="Negotiation Micro-Agent"
                                icon="🗣️"
                                status={stage === 2 ? 'working' : stage >= 5 ? 'complete' : 'idle'}
                                description="Spawns specifically to handle non-responsive borrower"
                            >
                                {stage === 1 && (
                                    <div className="text-sm text-gray-600">
                                        <p>Orchestrator detected silence. Spawning specialized agent to draft culturally-appropriate follow-up...</p>
                                    </div>
                                )}
                                {stage === 2 && (
                                    <div className="text-sm text-gray-600">
                                        <p>⚠️ Orchestrator detected silence. Spawning specialized agent to draft culturally-appropriate follow-up...</p>
                                    </div>
                                )}
                                {stage === 3 && (
                                    <div className="text-sm text-gray-600">
                                        <p>Drafting follow-up email...</p>
                                    </div>
                                )}
                                {stage === 4 && (
                                    <div className="text-sm text-gray-600">
                                        <p>📥 Response received! Micro-agent extracting data...</p>
                                    </div>
                                )}
                                {stage >= 5 && (
                                    <div className="text-sm text-gray-600">
                                        <p>✅ Task complete. Micro-agent dissolving to free resources.</p>
                                    </div>
                                )}
                            </AgentCard>
                        </div>
                    )}

                    {/* Follow-up Email */}
                    {stage >= 3 && (
                        <div ref={step3Ref} className="animate-fade-in">
                            <p className="text-sm text-gray-500 mb-2">Follow-up email sent:</p>
                            <EmailPreview
                                from={emailTemplates.followUp.from}
                                to={emailTemplates.followUp.to}
                                subject={emailTemplates.followUp.subject}
                                body={emailTemplates.followUp.body}
                                timestamp={emailTemplates.followUp.timestamp}
                            />
                        </div>
                    )}

                    {/* Borrower Reply */}
                    {stage >= 4 && (
                        <div ref={step4Ref} className="animate-fade-in">
                            <p className="text-sm text-gray-500 mb-2">📬 Borrower replied:</p>
                            <EmailPreview
                                from={emailTemplates.borrowerReply.from}
                                to={emailTemplates.borrowerReply.to}
                                subject={emailTemplates.borrowerReply.subject}
                                body={emailTemplates.borrowerReply.body}
                                timestamp={emailTemplates.borrowerReply.timestamp}
                                attachments={emailTemplates.borrowerReply.attachments}
                            />
                        </div>
                    )}

                    {/* Thank You Email */}
                    {stage >= 5 && (
                        <div className="animate-fade-in space-y-4">
                            <p className="text-sm text-gray-500 mb-2">✉️ Automatic acknowledgment:</p>
                            <EmailPreview
                                from={emailTemplates.thankYou.from}
                                to={emailTemplates.thankYou.to}
                                subject={emailTemplates.thankYou.subject}
                                body={emailTemplates.thankYou.body}
                                timestamp={emailTemplates.thankYou.timestamp}
                            />

                            {/* Key Insight */}
                            <div ref={step5Ref} className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <span className="text-3xl">✨</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">The "AI Operating System"</h4>
                                        <p className="text-gray-600">
                                            Unlike rigid workflows, the system is an ecosystem. The "Negotiator" agent didn't exist
                                            until the borrower went silent. It spawned, solved the problem, and evaporated.
                                        </p>
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
