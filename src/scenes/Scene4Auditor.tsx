'use client';

import { useState, useEffect } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AgentCard from '@/components/AgentCard';
import MCPPanel from '@/components/MCPPanel';
import ContinueButton from '@/components/ContinueButton';
import { januaryPL, bankData, strData, mcpCalls } from '@/data/simulationData';

export default function Scene4Auditor() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 1000),  // Fetching bank data
            setTimeout(() => setStage(2), 2500),  // Bank data received
            setTimeout(() => setStage(3), 4000),  // Fetching STR data
            setTimeout(() => setStage(4), 5500),  // STR data received
            setTimeout(() => setStage(5), 7000),  // Triangulation complete
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="max-w-5xl mx-auto">
            <SceneHeader
                title="The Auditor"
                subtitle="Verification Agent Triangulates Data"
                day="Day 4 — Immediate"
            />

            <div className="space-y-6">
                {/* Agent Card */}
                <AgentCard
                    name="Verification Agent"
                    icon="✅"
                    status={stage === 0 ? 'idle' : stage < 5 ? 'working' : 'complete'}
                    description="Cross-validates data against independent sources"
                >
                    {stage === 1 && <p className="text-sm text-gray-600">🏦 Calling Bank API for January deposits...</p>}
                    {stage === 2 && <p className="text-sm text-gray-600">✔️ Bank data received. Fetching STR market data...</p>}
                    {stage === 3 && <p className="text-sm text-gray-600">📊 Calling STR API for comp set analysis...</p>}
                    {stage === 4 && <p className="text-sm text-gray-600">🔄 All data received. Performing triangulation...</p>}
                    {stage === 5 && <p className="text-sm text-gray-600">✅ Verification complete. Data marked as VERIFIED.</p>}
                </AgentCard>

                {/* Three Column Comparison */}
                <div className="grid grid-cols-3 gap-4">
                    {/* P&L Data */}
                    <div className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-all duration-500 ${stage >= 1 ? 'border-blue-500' : 'border-gray-200'
                        }`}>
                        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
                            <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                                <span>📄</span> Reported P&L
                            </h4>
                        </div>
                        <div className="p-4">
                            <div className="text-center mb-4">
                                <p className="text-3xl font-bold text-gray-800">${januaryPL.totalRevenue.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Total Revenue</p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Rooms</span>
                                    <span className="font-medium">$485,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">F&B Total</span>
                                    <span className="font-medium">$223,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Events & Other</span>
                                    <span className="font-medium">$102,000</span>
                                </div>
                            </div>
                        </div>
                        {stage >= 5 && (
                            <div className="bg-green-500 text-white text-center py-2 text-sm font-semibold animate-fade-in">
                                ✓ SOURCE
                            </div>
                        )}
                    </div>

                    {/* Bank Data */}
                    <div className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-all duration-500 ${stage >= 2 ? 'border-green-500' : 'border-gray-200'
                        }`}>
                        <div className="bg-green-50 border-b border-green-200 px-4 py-3">
                            <h4 className="font-semibold text-green-800 flex items-center gap-2">
                                <span>🏦</span> Bank Deposits
                            </h4>
                        </div>
                        <div className="p-4">
                            {stage >= 2 ? (
                                <>
                                    <div className="text-center mb-4">
                                        <p className="text-3xl font-bold text-gray-800">${bankData.totalDeposits.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500">Total Deposits</p>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Transactions</span>
                                            <span className="font-medium">{bankData.depositBreakdown.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Account</span>
                                            <span className="font-medium text-xs">{bankData.bankName}</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-32">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
                                </div>
                            )}
                        </div>
                        {stage >= 5 && (
                            <div className="bg-green-500 text-white text-center py-2 text-sm font-semibold animate-fade-in">
                                ✓ VERIFIED
                            </div>
                        )}
                    </div>

                    {/* STR Data */}
                    <div className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-all duration-500 ${stage >= 4 ? 'border-purple-500' : 'border-gray-200'
                        }`}>
                        <div className="bg-purple-50 border-b border-purple-200 px-4 py-3">
                            <h4 className="font-semibold text-purple-800 flex items-center gap-2">
                                <span>📊</span> STR Market Data
                            </h4>
                        </div>
                        <div className="p-4">
                            {stage >= 4 ? (
                                <>
                                    <div className="text-center mb-4">
                                        <p className="text-3xl font-bold text-gray-800">{strData.property.occupancy}%</p>
                                        <p className="text-sm text-gray-500">Reported Occupancy</p>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">ADR</span>
                                            <span className="font-medium">${strData.property.adr}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">RevPAR Index</span>
                                            <span className="font-medium text-green-600">{strData.index.revpar}%</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-32">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
                                </div>
                            )}
                        </div>
                        {stage >= 5 && (
                            <div className="bg-green-500 text-white text-center py-2 text-sm font-semibold animate-fade-in">
                                ✓ VALIDATED
                            </div>
                        )}
                    </div>
                </div>

                {/* MCP Panels */}
                {stage >= 2 && (
                    <div className="animate-fade-in">
                        <MCPPanel
                            id="scene4-bank"
                            tool="get_bank_transactions"
                            request={mcpCalls.getBankTransactions.request}
                            response={mcpCalls.getBankTransactions.response}
                        />
                    </div>
                )}

                {stage >= 4 && (
                    <div className="animate-fade-in">
                        <MCPPanel
                            id="scene4-str"
                            tool="get_str_data"
                            request={mcpCalls.getStrData.request}
                            response={mcpCalls.getStrData.response}
                        />
                    </div>
                )}

                {/* Variance Analysis */}
                {stage >= 5 && (
                    <div className="bg-green-50 border border-green-300 rounded-xl p-6 animate-fade-in">
                        <div className="flex items-start gap-4">
                            <span className="text-4xl">🎯</span>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 mb-3">Triangulation Result: VERIFIED</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 border border-green-200">
                                        <p className="text-sm text-gray-500 mb-1">Revenue vs Bank Deposits</p>
                                        <p className="text-lg font-semibold text-green-600">
                                            {bankData.variance.percentVariance}% variance
                                        </p>
                                        <p className="text-xs text-gray-500">{bankData.variance.note}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-green-200">
                                        <p className="text-sm text-gray-500 mb-1">Occupancy vs STR Market</p>
                                        <p className="text-lg font-semibold text-green-600">
                                            {strData.marketTrend}
                                        </p>
                                        <p className="text-xs text-gray-500">RevPAR Index: {strData.index.revpar}% of comp set</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Continue Button */}
            <div className="mt-8 flex justify-center">
                <ContinueButton label="Check Loan Compliance" disabled={stage < 5} />
            </div>
        </div>
    );
}
