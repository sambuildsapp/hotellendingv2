'use client';

import { useState, useEffect } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AgentCard from '@/components/AgentCard';
import MCPPanel from '@/components/MCPPanel';
import ContinueButton from '@/components/ContinueButton';
import { januaryPL } from '@/data/simulationData';

export default function Scene3Brain() {
    const [stage, setStage] = useState(0);
    const [processedItems, setProcessedItems] = useState<number[]>([]);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 1000),  // Reading documents
            setTimeout(() => setStage(2), 2500),  // Processing line items
        ];

        // Animate line items being processed
        const itemTimers = januaryPL.lineItems.map((_, index) =>
            setTimeout(() => {
                setProcessedItems(prev => [...prev, index]);
            }, 3000 + index * 200)
        );

        setTimeout(() => setStage(3), 3000 + januaryPL.lineItems.length * 200 + 500); // Complete

        return () => {
            timers.forEach(clearTimeout);
            itemTimers.forEach(clearTimeout);
        };
    }, []);

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 95) return 'text-green-600 bg-green-100';
        if (confidence >= 90) return 'text-blue-600 bg-blue-100';
        return 'text-amber-600 bg-amber-100';
    };

    const flaggedItem = januaryPL.lineItems.find(item => item.needsReview);

    return (
        <div className="max-w-5xl mx-auto">
            <SceneHeader
                title="The Brain"
                subtitle="Standardization Agent Maps to USALI"
                day="Day 4 — 5 Minutes After Receipt"
            />

            <div className="space-y-6">
                {/* Agent Card */}
                <AgentCard
                    name="Standardization Agent"
                    icon="🧠"
                    status={stage === 0 ? 'idle' : stage < 3 ? 'working' : 'complete'}
                    description="Semantic understanding and USALI classification"
                >
                    {stage === 1 && <p className="text-sm text-gray-600">📄 Reading Excel and PDF using multimodal vision...</p>}
                    {stage === 2 && <p className="text-sm text-gray-600">🔄 Mapping line items to USALI categories...</p>}
                    {stage === 3 && (
                        <p className="text-sm text-gray-600">
                            ✅ Processed {januaryPL.lineItems.length} line items. {flaggedItem ? '1 flagged for human review.' : 'All auto-classified.'}
                        </p>
                    )}
                </AgentCard>

                {/* Document Processing Visualization */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Source Document */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                            <span className="text-green-500">📊</span>
                            <span className="font-medium text-gray-700">January_2026_PL.xlsx</span>
                        </div>
                        <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                            {januaryPL.lineItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center p-2 rounded transition-all duration-300 ${processedItems.includes(index)
                                            ? 'bg-blue-50 border-l-4 border-blue-500'
                                            : 'bg-gray-50'
                                        }`}
                                >
                                    <span className="text-sm text-gray-700">{item.category}</span>
                                    <span className={`text-sm font-mono ${item.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        ${Math.abs(item.amount).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* USALI Mapping Results */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
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

                {/* Learning Loop */}
                {stage >= 3 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 animate-fade-in">
                        <div className="flex items-start gap-4">
                            <span className="text-3xl">🔄</span>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Learning Loop Activated</h4>
                                <p className="text-gray-600">
                                    This human decision is recorded. Next time &quot;Party Supplies&quot; appears across the portfolio,
                                    the Standardization Agent will automatically classify it as Marketing with 94% confidence.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Continue Button */}
            <div className="mt-8 flex justify-center">
                <ContinueButton label="Verify the Data" disabled={stage < 3} />
            </div>
        </div>
    );
}
