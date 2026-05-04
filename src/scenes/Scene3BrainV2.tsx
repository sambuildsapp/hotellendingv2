'use client';

import React, { useState } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AgentCard from '@/components/AgentCard';
import { januaryPL } from '@/data/simulationData';
import SimulationControlBar from '@/components/v2/SimulationControlBar';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useSimulation } from '@/context/SimulationContext';

export default function Scene3BrainV2() {
    const { nextScene, prevScene } = useSimulation();
    const [stage, setStage] = useState(0);
    const [processedItems, setProcessedItems] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-scroll refs
    const step1Ref = useAutoScroll<HTMLDivElement>(stage === 1); // Agent
    const step2Ref = useAutoScroll<HTMLDivElement>(stage === 2); // Processing
    const step3Ref = useAutoScroll<HTMLDivElement>(stage === 3); // Flagged Item

    const totalSteps = 3;

    const handleNext = async () => {
        if (stage >= totalSteps) return;

        setIsAnimating(true);

        // Specific delays and actions for each stage transition
        if (stage === 0) { // From idle to stage 1 (Reading documents)
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else if (stage === 1) { // From stage 1 to stage 2 (Processing line items)
            // Visualize processing items one by one
            for (let i = 0; i < januaryPL.lineItems.length; i++) {
                await new Promise(r => setTimeout(r, 100)); // Fast scroll
                setProcessedItems(prev => [...prev, i]);
            }
            await new Promise(resolve => setTimeout(resolve, 500)); // Small delay after all items
        } else if (stage === 2) { // From stage 2 to stage 3 (Complete/Review)
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        setStage(prev => prev + 1);
        setIsAnimating(false);
    };

    const handlePrev = () => {
        if (stage > 0) {
            setStage(prev => prev - 1);
            if (stage === 2) setProcessedItems([]); // Reset processing on back from stage 2 to 1
        }
    };

    const handleReset = () => {
        setStage(0);
        setProcessedItems([]);
        setIsAnimating(false);
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 95) return 'text-green-600 bg-green-100';
        if (confidence >= 90) return 'text-blue-600 bg-blue-100';
        return 'text-amber-600 bg-amber-100';
    };

    const flaggedItem = januaryPL.lineItems.find(item => item.needsReview);

    return (
        <div className="min-h-screen bg-slate-50/50">
            <div className="max-w-5xl mx-auto px-6 py-8 pb-32">
                <SceneHeader
                    title="The Messy Reality"
                    subtitle="Adaptive Ingestion & Confidence Scoring"
                    day="Day 4 — 5 Minutes After Receipt"
                />

                <div className="space-y-6">
                    {/* Agent Card */}
                    <div ref={step1Ref}>
                        <AgentCard
                            name="Standardization Agent"
                            icon="🧠"
                            status={stage === 0 ? 'idle' : stage < 3 ? 'working' : 'complete'}
                            description="Mapping messy inputs to USALI standards"
                        >
                            {stage >= 1 && (
                                <div className="text-sm text-gray-600 animate-fade-in">
                                    {stage === 1 && <p>📥 Ingesting Excel & PDF files...</p>}
                                    {stage === 2 && <p>⚙️ Applying mapping rules (Confidence: 94%)...</p>}
                                    {stage === 3 && <p>⚠️ Ambiguous items flagged for review.</p>}
                                </div>
                            )}
                        </AgentCard>
                    </div>

                    {/* Document Processing Visualization */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Source Document - messy raw excel */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative">
                            <div className="absolute top-2 right-2 z-10">
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded border border-red-200 font-medium">RAW INPUT</span>
                            </div>
                            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                                <span className="text-green-500">📊</span>
                                <span className="font-medium text-gray-700">January_2026_PL_v2_FINAL.xlsx</span>
                            </div>
                            <div className="p-4 space-y-2 max-h-96 overflow-y-auto font-mono text-xs">
                                {/* Messy Header */}
                                <div className="grid grid-cols-2 gap-4 border-b pb-2 mb-2 text-gray-400">
                                    <div>Acct Desc</div>
                                    <div className="text-right">Amt</div>
                                </div>
                                {/* Messy Rows */}
                                {januaryPL.lineItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center p-2 rounded transition-all duration-300 opacity-60 ${processedItems.includes(index)
                                            ? 'bg-blue-50 border-l-4 border-blue-500 opacity-100'
                                            : 'bg-white'
                                            }`}
                                    >
                                        {/* Simulate typos in raw data */}
                                        <span className="text-gray-600 truncate">
                                            {index % 3 === 0 ? item.category.toUpperCase() :
                                                index % 2 === 0 ? `* ${item.category}` : item.category}
                                        </span>
                                        <span className="text-gray-500">
                                            {Math.abs(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* USALI Mapping Results */}
                        <div ref={step2Ref} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                                <span className="text-blue-500">📋</span>
                                <span className="font-medium text-gray-700">USALI Mapped Output</span>
                            </div>
                            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                                {januaryPL.lineItems.map((item, index) => (
                                    processedItems.includes(index) && (
                                        <div
                                            key={index}
                                            className={`p-2 rounded border animate-fade-in ${item.needsReview ? 'bg-amber-50 border-amber-300' : 'bg-green-50 border-green-200'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">{item.category}</p>
                                                    {item.note && (
                                                        <p className="text-xs text-gray-500 italic">{item.note}</p>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {item.usaliCode ? (
                                                        <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
                                                            {item.usaliCode}
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded">
                                                            ⚠️ Review
                                                        </span>
                                                    )}
                                                    <span className={`text-xs px-2 py-1 rounded ${getConfidenceColor(item.confidence)}`}>
                                                        {item.confidence}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Human Review Callout */}
                    {stage >= 3 && flaggedItem && (
                        <div className="bg-amber-50 border border-amber-300 rounded-xl p-6 animate-fade-in">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">👤</span>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-2">Human Review Required (1 item)</h4>
                                    <p className="text-gray-600 mb-4">
                                        The AI is {flaggedItem.confidence}% confident that &quot;{flaggedItem.category}&quot; belongs in F&B, but
                                        flagged it because confidence is below 90%. A Credit Analyst reviews and determines: <strong>Marketing</strong>.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-2 bg-white border border-amber-300 rounded-lg text-sm">
                                            {flaggedItem.category} → <span className="font-semibold text-blue-600">Marketing (6100)</span>
                                        </span>
                                        <span className="text-sm text-gray-500">⏱️ Reviewed in 45 seconds</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Learning Loop Insight */}
                    {stage >= 3 && (
                        <div ref={step3Ref} className="bg-blue-50 border border-blue-200 rounded-xl p-6 animate-fade-in">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">🧠</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Learning Loop Activated</h4>
                                    <p className="text-gray-600">
                                        This human decision is recorded. Next time &quot;Party Supplies&quot; appears across the portfolio,
                                        the Standardization Agent will automatically classify it as Marketing with <strong>99.8% confidence</strong>.
                                    </p>
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
