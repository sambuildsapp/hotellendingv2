'use client';

import React, { useState } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AnnotatedWidget from '@/components/AnnotatedWidget';
import { useSimulation } from '@/context/SimulationContext';
import { portfolioData, dashboardStats, strData } from '@/data/simulationData';
import SimulationControlBar from '@/components/v2/SimulationControlBar';
import { useAutoScroll } from '@/hooks/useAutoScroll';

export default function Scene6DashboardV2() {
    const { showAllAnnotations, toggleAllAnnotations, nextScene, prevScene } = useSimulation();
    const [stage, setStage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-scroll refs
    const step1Ref = useAutoScroll<HTMLDivElement>(stage === 1); // Anomaly Alerts
    const step2Ref = useAutoScroll<HTMLDivElement>(stage === 2); // Risk Averted
    const step3Ref = useAutoScroll<HTMLDivElement>(stage === 3); // Key Insight

    const totalSteps = 3;

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

    const getStatusColor = (status: string, hotelName: string) => {
        // Narrative Sync: Hide alert/review status until stage 1
        let effectiveStatus = status;
        if (stage === 0) {
            if (hotelName === 'Hotel Beachside') effectiveStatus = 'verified';
            if (hotelName === 'Hotel Airport') effectiveStatus = 'verified';
            if (hotelName === 'Hotel Historic') effectiveStatus = 'verified';
        }

        switch (effectiveStatus) {
            case 'verified': return 'bg-green-100 text-green-800';
            case 'review': return 'bg-amber-100 text-amber-800';
            case 'alert': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getRiskColor = (risk: string, hotelName: string) => {
        // Narrative Sync: Hide high/medium risk until stage 1/2
        let effectiveRisk = risk;
        if (stage === 0) {
            if (hotelName === 'Hotel Beachside' || hotelName === 'Hotel Historic' || hotelName === 'Hotel Airport') {
                effectiveRisk = 'Low';
            }
        }

        switch (effectiveRisk) {
            case 'Low': return 'text-green-600';
            case 'Medium': return 'text-amber-600';
            case 'High': return 'text-red-600';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            <div className="max-w-6xl mx-auto px-6 py-8 pb-40">
                <SceneHeader
                    title="The Commander"
                    subtitle="Risk-Adjusted Portfolio View"
                />

                {/* Toggle Annotations */}
                <div className="flex justify-end mb-8">
                    <button
                        onClick={toggleAllAnnotations}
                        className={`px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all flex items-center gap-2 border ${showAllAnnotations
                            ? 'bg-blue-600 text-white border-blue-700 shadow-blue-200'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        <span>✨</span>
                        {showAllAnnotations ? 'Hide AI Insights' : 'Show AI Insights'}
                    </button>
                </div>

                {/* Dashboard Layout */}
                <div className="space-y-8">
                    {/* Top Row: Core Metrics (Always Visible) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <AnnotatedWidget
                            id="portfolio"
                            title="Portfolio Health"
                            annotation="Compliance Agent automatically evaluated 10 loan agreements and calculated DSCRs."
                        >
                            <div className="space-y-3">
                                {portfolioData.slice(0, 4).map((hotel, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600 truncate flex-1">{hotel.name}</span>
                                        <span className={`font-bold ${getRiskColor(hotel.riskScore, hotel.name)}`}>
                                            {hotel.dscr ? `${hotel.dscr}x` : '—'}
                                        </span>
                                    </div>
                                ))}
                                <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                                    <span className="text-xs text-slate-400">Total Properties</span>
                                    <span className="text-sm font-bold text-slate-700">12</span>
                                </div>
                            </div>
                        </AnnotatedWidget>

                        <AnnotatedWidget
                            id="revenue"
                            title="Revenue Match"
                            annotation={`Verification Agent matched $${(dashboardStats.revenueVerified / 1000000).toFixed(1)}M in revenue against bank feeds.`}
                        >
                            <div className="flex flex-col items-center justify-center pt-2">
                                <div className="text-4xl font-black text-emerald-600">98%</div>
                                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">Consistency Rate</div>
                                <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98%' }} />
                                </div>
                            </div>
                        </AnnotatedWidget>

                        <AnnotatedWidget
                            id="str"
                            title="Market (STR)"
                            annotation="RevPAR Index matches 3-year seasonal pattern, discounting initial noise."
                        >
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Occ Index</span>
                                    <span className="font-bold text-slate-700">{strData.index.occupancy}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">ADR Index</span>
                                    <span className="font-bold text-slate-700">{strData.index.adr}%</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                                    <span className="text-slate-500 font-medium">RevPAR Index</span>
                                    <span className="font-black text-emerald-600">{strData.index.revpar}%</span>
                                </div>
                            </div>
                        </AnnotatedWidget>

                        <AnnotatedWidget
                            id="review"
                            title="Review Queue"
                            annotation="Standardization Agent auto-classified 99.7% of items. Only 3 exceptions flagged."
                        >
                            <div className="flex flex-col items-center justify-center pt-2">
                                <div className="text-4xl font-black text-blue-600">{dashboardStats.humanReviewRequired}</div>
                                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">Items Pending</div>
                                <div className="mt-4 flex gap-1">
                                    {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                                </div>
                            </div>
                        </AnnotatedWidget>
                    </div>

                    {/* Reveal Row 1: Anomalies */}
                    <div ref={step1Ref} className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${stage >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none absolute w-full'}`}>
                        <AnnotatedWidget
                            id="anomaly"
                            title="🚨 AI Anomaly Alerts"
                            annotation="Real-time detection of patterns outside 3 standard deviations of historical norms."
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                                    <p className="text-[10px] font-bold text-red-800 uppercase mb-1">Hotel Beachside</p>
                                    <p className="text-sm font-semibold text-red-900">Refund Spike (+340%)</p>
                                </div>
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                                    <p className="text-[10px] font-bold text-amber-800 uppercase mb-1">Hotel Historic</p>
                                    <p className="text-sm font-semibold text-amber-900">DSCR Floor Breach</p>
                                </div>
                            </div>
                        </AnnotatedWidget>

                        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl flex items-center gap-4">
                            <div className="text-4xl">🤖</div>
                            <div>
                                <h4 className="font-bold text-lg leading-tight">Proactive Intervention Enabled</h4>
                                <p className="text-blue-100 text-sm mt-1">Verification Agent detected these patterns 2 weeks before month-end close.</p>
                            </div>
                        </div>
                    </div>

                    {/* Reveal Row 2: The Alpha */}
                    <div ref={step2Ref} className={`transition-all duration-700 ${stage >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none absolute w-full'}`}>
                        <AnnotatedWidget
                            id="risk-averted"
                            title="🛡️ Risk Averted: Cash Leakage"
                            annotation="This $15k catch is pure Alpha. Traditional banks miss this until Day 45 or forever."
                        >
                            <div className="flex items-center gap-6 p-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded uppercase">Detected Day 4</span>
                                        <span className="text-slate-400 text-[10px] line-through">Normal: Day 45</span>
                                    </div>
                                    <p className="text-xl font-bold text-slate-800">Hotel Downtown: $15,200 Recovered</p>
                                    <p className="text-sm text-slate-500 mt-1">Unrecorded refunds matched a known leakage pattern identified by Fraud Agent.</p>
                                </div>
                                <div className="hidden lg:block w-px h-16 bg-slate-100" />
                                <div className="hidden lg:flex flex-col items-center px-4">
                                    <span className="text-2xl font-black text-emerald-600">+$15.2k</span>
                                    <span className="text-[10px] text-slate-400 font-bold">YIELD IMPACT</span>
                                </div>
                            </div>
                        </AnnotatedWidget>
                    </div>

                    {/* Data Table (Always Visible, but items change based on stage) */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Portfolio Status Table</h3>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{portfolioData.length} PROPERTIES MONITORED</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50/50 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Property</th>
                                        <th className="px-6 py-3 text-left">Audit Status</th>
                                        <th className="px-6 py-3 text-left">Verified DSCR</th>
                                        <th className="px-6 py-3 text-left">System Risk</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {portfolioData.slice(0, 6).map((hotel, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-slate-700">{hotel.name}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${getStatusColor(hotel.status, hotel.name)}`}>
                                                    {stage === 0 && (hotel.name === 'Hotel Beachside' || hotel.name === 'Hotel Airport' || hotel.name === 'Hotel Historic')
                                                        ? 'Verified'
                                                        : hotel.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-mono font-bold text-slate-600">
                                                {hotel.dscr ? `${hotel.dscr}x` : '—'}
                                            </td>
                                            <td className={`px-6 py-4 font-bold ${getRiskColor(hotel.riskScore, hotel.name)}`}>
                                                {stage === 0 && (hotel.name === 'Hotel Beachside' || hotel.name === 'Hotel Airport' || hotel.name === 'Hotel Historic')
                                                    ? 'Low'
                                                    : hotel.riskScore}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Final Insight: The Alpha */}
                    <div ref={step3Ref} className={`bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-2xl transition-all duration-1000 ${stage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none absolute w-full'}`}>
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30">🎯</div>
                            <div className="flex-1">
                                <h4 className="text-2xl font-black mb-3">The Bottom Line: Capacity is Alpha</h4>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    You didn&apos;t just automate back-office tasks. You gained <span className="text-white font-bold">a massive 10x capacity multiplier</span>.
                                    While your peers wait for PDFs, you&apos;ve already neutralized cash leakage and confirmed 99% of your portfolio is safe.
                                </p>
                                <div className="mt-8 grid grid-cols-3 gap-8">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Yield Impact</p>
                                        <p className="text-2xl font-black text-emerald-400">+15.2k</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Time Gained</p>
                                        <p className="text-2xl font-black text-blue-400">3+ Weeks</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Agency</p>
                                        <p className="text-2xl font-black text-purple-400">Supervised</p>
                                    </div>
                                </div>
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
