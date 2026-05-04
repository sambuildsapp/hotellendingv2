'use client';

import SceneHeader from '@/components/SceneHeader';
import AnnotatedWidget from '@/components/AnnotatedWidget';
import ContinueButton from '@/components/ContinueButton';
import { useSimulation } from '@/context/SimulationContext';
import { portfolioData, dashboardStats, strData, bankData } from '@/data/simulationData';

export default function Scene6Dashboard() {
    const { showAllAnnotations, toggleAllAnnotations } = useSimulation();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'verified': return 'bg-green-100 text-green-800';
            case 'review': return 'bg-amber-100 text-amber-800';
            case 'alert': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'Low': return 'text-green-600';
            case 'Medium': return 'text-amber-600';
            case 'High': return 'text-red-600';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <SceneHeader
                title="The Dashboard"
                subtitle="Credit Officer's Command Center"
                day="Day 5 — 9:00 AM"
            />

            {/* Toggle Annotations */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={toggleAllAnnotations}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${showAllAnnotations
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    <span>✨</span>
                    {showAllAnnotations ? 'Hide AI Insights' : 'Show All AI Insights'}
                </button>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Exception Inbox */}
                <AnnotatedWidget
                    id="inbox"
                    title="Exception Inbox"
                    annotation="Collection Agent gathered data from 12 properties. Standardization Agent auto-classified 847 line items. Only 3 required human review."
                >
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div>
                                <p className="font-medium text-gray-800">Hotel Downtown</p>
                                <p className="text-sm text-green-600">Verified & Compliant</p>
                            </div>
                            <span className="text-green-500 text-xl">✓</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <div>
                                <p className="font-medium text-gray-800">Hotel Airport</p>
                                <p className="text-sm text-amber-600">Classification review needed</p>
                            </div>
                            <span className="text-amber-500 text-xl">⚠</span>
                        </div>
                    </div>
                </AnnotatedWidget>

                {/* Portfolio Health */}
                <AnnotatedWidget
                    id="portfolio"
                    title="Portfolio DSCR Health"
                    annotation="Compliance Agent automatically evaluated 10 loan agreements and calculated DSCRs without any manual input."
                >
                    <div className="space-y-2">
                        {portfolioData.slice(0, 5).map((hotel, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-gray-700 truncate flex-1">{hotel.name}</span>
                                <span className={`font-semibold ${getRiskColor(hotel.riskScore)}`}>
                                    {hotel.dscr ? `${hotel.dscr}x` : '—'}
                                </span>
                            </div>
                        ))}
                        <p className="text-xs text-gray-400 pt-2">+ 5 more properties</p>
                    </div>
                </AnnotatedWidget>

                {/* Revenue Verification */}
                <AnnotatedWidget
                    id="revenue"
                    title="Revenue vs Bank"
                    annotation={`Verification Agent triangulated $${(dashboardStats.revenueVerified / 1000000).toFixed(1)}M in reported revenue against bank deposits this month.`}
                >
                    <div className="text-center">
                        <div className="relative inline-flex items-center justify-center w-24 h-24">
                            <svg className="w-24 h-24 transform -rotate-90">
                                <circle cx="48" cy="48" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                <circle
                                    cx="48" cy="48" r="40" fill="none" stroke="#22c55e" strokeWidth="8"
                                    strokeDasharray={`${98 * 2.51} ${100 * 2.51}`}
                                />
                            </svg>
                            <span className="absolute text-xl font-bold text-green-600">98%</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Match Rate</p>
                        <p className="text-xs text-gray-400">{bankData.variance.percentVariance}% avg variance</p>
                    </div>
                </AnnotatedWidget>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* STR Comparison */}
                <AnnotatedWidget
                    id="str"
                    title="Market Performance"
                    annotation="STR data fetched via MCP for 10 properties. 3 flagged as underperforming their competitive set."
                >
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Occupancy Index</span>
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${strData.index.occupancy}%` }} />
                                </div>
                                <span className="text-sm font-semibold text-green-600">{strData.index.occupancy}%</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">ADR Index</span>
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${strData.index.adr}%` }} />
                                </div>
                                <span className="text-sm font-semibold text-green-600">{strData.index.adr}%</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">RevPAR Index</span>
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `100%` }} />
                                </div>
                                <span className="text-sm font-semibold text-green-600">{strData.index.revpar}%</span>
                            </div>
                        </div>
                    </div>
                </AnnotatedWidget>

                {/* Anomaly Alerts */}
                <AnnotatedWidget
                    id="anomaly"
                    title="Anomaly Alerts"
                    annotation="Verification Agent detected unusual patterns 2 weeks before month-end close—enabling proactive intervention."
                >
                    <div className="space-y-3">
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">🚨</span>
                                <div>
                                    <p className="font-medium text-red-800">Hotel Beachside</p>
                                    <p className="text-sm text-red-600">Refund spike detected (+340%)</p>
                                    <p className="text-xs text-gray-500 mt-1">Detected Feb 3 • Event likely Jul 28</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">⚡</span>
                                <div>
                                    <p className="font-medium text-amber-800">Hotel Historic</p>
                                    <p className="text-sm text-amber-600">DSCR approaching covenant floor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnnotatedWidget>

                {/* Human Review Queue */}
                <AnnotatedWidget
                    id="review"
                    title="Human Review Queue"
                    annotation="Of 847 line items processed this month, only 0.3% required human classification—saving 40+ hours of analyst time."
                >
                    <div className="text-center py-4">
                        <p className="text-5xl font-bold text-blue-600 mb-2">{dashboardStats.humanReviewRequired}</p>
                        <p className="text-sm text-gray-500">Items Pending Review</p>
                        <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                            <span>{dashboardStats.lineItemsProcessed} processed</span>
                            <span>•</span>
                            <span>99.7% auto-classified</span>
                        </div>
                    </div>
                </AnnotatedWidget>
            </div>

            {/* Portfolio Status Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Full Portfolio Status</h3>
                    <span className="text-sm text-gray-500">{portfolioData.length} properties</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">Property</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">DSCR</th>
                                <th className="px-4 py-3 text-left">Risk Score</th>
                                <th className="px-4 py-3 text-left">Alert</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {portfolioData.map((hotel, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-800">{hotel.name}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hotel.status)}`}>
                                            {hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-mono">{hotel.dscr ? `${hotel.dscr}x` : '—'}</td>
                                    <td className={`px-4 py-3 font-medium ${getRiskColor(hotel.riskScore)}`}>{hotel.riskScore}</td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{hotel.alert || '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Key Insight */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <span className="text-4xl">🎯</span>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">The Power of Parallel Processing</h4>
                        <p className="text-gray-600">
                            While you followed <strong>Hotel Downtown&apos;s story</strong>, the same AI agents were working
                            across <strong>all {dashboardStats.totalProperties} properties</strong> simultaneously. Every widget
                            on this dashboard was populated by AI—verified, standardized, and triangulated—requiring human
                            attention on <strong>only {dashboardStats.humanReviewRequired} items</strong>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Continue Button */}
            <div className="mt-8 flex justify-center">
                <ContinueButton label="See What This Replaced" />
            </div>
        </div>
    );
}
