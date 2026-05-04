'use client';

import { useState, useEffect } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AgentCard from '@/components/AgentCard';
import MCPPanel from '@/components/MCPPanel';
import ContinueButton from '@/components/ContinueButton';
import { loanData, dscrCalculation, mcpCalls } from '@/data/simulationData';

export default function Scene5Watchdog() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 1000),  // Reading loan agreement
            setTimeout(() => setStage(2), 3000),  // Found covenant
            setTimeout(() => setStage(3), 4500),  // Calculating DSCR
            setTimeout(() => setStage(4), 6500),  // Result
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <SceneHeader
                title="The Watchdog"
                subtitle="Compliance Agent Checks Covenants"
                day="Day 4 — Immediate"
            />

            <div className="space-y-6">
                {/* Agent Card */}
                <AgentCard
                    name="Compliance Agent"
                    icon="📋"
                    status={stage === 0 ? 'idle' : stage < 4 ? 'working' : 'complete'}
                    description="Evaluates covenant compliance against loan documents"
                >
                    {stage === 1 && <p className="text-sm text-gray-600">📖 Reading loan agreement for Hotel Downtown...</p>}
                    {stage === 2 && <p className="text-sm text-gray-600">🔍 Found DSCR covenant. Calculating compliance...</p>}
                    {stage === 3 && <p className="text-sm text-gray-600">🧮 Computing Debt Service Coverage Ratio...</p>}
                    {stage === 4 && <p className="text-sm text-gray-600">✅ Compliance check complete. DSCR: PASS</p>}
                </AgentCard>

                {/* Loan Agreement Excerpt */}
                {stage >= 1 && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in">
                        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                            <span>📄</span>
                            <span className="font-medium text-gray-700">Loan Agreement: {loanData.loanId}</span>
                        </div>
                        <div className="p-6">
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 font-mono text-sm">
                                <p className="text-gray-500 text-xs mb-2">Section 7.2(a) - Financial Covenants</p>
                                <p className="text-gray-800">
                                    Borrower shall maintain a minimum <mark className="bg-yellow-300 px-1">Debt Service Coverage Ratio</mark> of
                                    not less than <mark className="bg-yellow-300 px-1">{loanData.covenants.minDSCR}x</mark>, tested monthly
                                    based on the trailing thirty (30) day period.
                                </p>
                            </div>

                            {stage >= 2 && (
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Loan Principal</p>
                                        <p className="text-xl font-semibold">${loanData.principal.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Monthly Debt Service</p>
                                        <p className="text-xl font-semibold">${loanData.monthlyDebtService.toLocaleString()}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* MCP Panel */}
                {stage >= 2 && (
                    <div className="animate-fade-in">
                        <MCPPanel
                            id="scene5-loan"
                            tool="read_loan_agreement"
                            request={mcpCalls.readLoanAgreement.request}
                            response={mcpCalls.readLoanAgreement.response}
                        />
                    </div>
                )}

                {/* DSCR Calculation */}
                {stage >= 3 && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 animate-fade-in">
                        <h4 className="font-semibold text-gray-800 mb-4">DSCR Calculation</h4>
                        <div className="flex items-center justify-center gap-4 text-center">
                            <div className="bg-blue-50 rounded-xl p-6 flex-1">
                                <p className="text-sm text-gray-500 mb-2">Net Operating Income</p>
                                <p className="text-3xl font-bold text-blue-600">${dscrCalculation.noi.toLocaleString()}</p>
                                <p className="text-xs text-gray-400">January 2026</p>
                            </div>
                            <div className="text-4xl text-gray-400">÷</div>
                            <div className="bg-purple-50 rounded-xl p-6 flex-1">
                                <p className="text-sm text-gray-500 mb-2">Debt Service</p>
                                <p className="text-3xl font-bold text-purple-600">${loanData.monthlyDebtService.toLocaleString()}</p>
                                <p className="text-xs text-gray-400">Monthly Payment</p>
                            </div>
                            <div className="text-4xl text-gray-400">=</div>
                            <div className={`rounded-xl p-6 flex-1 ${stage >= 4 ? 'bg-green-100' : 'bg-gray-100'}`}>
                                <p className="text-sm text-gray-500 mb-2">DSCR</p>
                                {stage >= 4 ? (
                                    <p className="text-3xl font-bold text-green-600">{dscrCalculation.actualDSCR}x</p>
                                ) : (
                                    <div className="animate-pulse">
                                        <div className="h-9 bg-gray-300 rounded w-16 mx-auto" />
                                    </div>
                                )}
                                <p className="text-xs text-gray-400">Minimum: {loanData.covenants.minDSCR}x</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Result */}
                {stage >= 4 && (
                    <div className="bg-green-50 border border-green-300 rounded-xl p-6 animate-fade-in">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-green-800">COVENANT COMPLIANT</h4>
                                    <p className="text-green-600">
                                        DSCR of {dscrCalculation.actualDSCR}x exceeds minimum of {loanData.covenants.minDSCR}x
                                        by {dscrCalculation.cushion}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Verified</p>
                                <p className="text-lg font-semibold text-gray-800">Feb 9, 2026</p>
                                <p className="text-sm text-gray-500">9:10 AM</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summary */}
                {stage >= 4 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 animate-fade-in">
                        <div className="flex items-start gap-4">
                            <span className="text-3xl">⚡</span>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">From Receipt to Verified in 5 Minutes</h4>
                                <p className="text-gray-600">
                                    What traditionally takes <strong>3 weeks</strong> of analyst time—chasing data, spreading spreadsheets,
                                    and manually calculating covenants—was completed <strong>autonomously overnight</strong>.
                                    Let&apos;s see the Credit Officer&apos;s dashboard...
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Continue Button */}
            <div className="mt-8 flex justify-center">
                <ContinueButton label="View the Dashboard" disabled={stage < 4} />
            </div>
        </div>
    );
}
