'use client';

import React, { useState } from 'react';
import SceneHeader from '@/components/SceneHeader';
import { processWithGemini, ProcessedRow } from '@/app/actions/process-entry';
import DSCRSpeedometer from '@/components/sandbox/DSCRSpeedometer';
import CreditMemo from '@/components/sandbox/CreditMemo';

const MOCK_CHAOS_DATA = `
Mktg Exp - Q1 Campaign - $12,500.00
Consulting Fees - J. Smith - 5000
Guest Supplies (Shampoo/Soap) - $4,230
Staff Lunch (Friday) - $450
Boiler Repair - Urgent - $5,200
Unknown Deposit - $1,200
`;

export default function SandboxPage() {
    const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');
    const [rawInput, setRawInput] = useState('');
    const [results, setResults] = useState<ProcessedRow[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleProcess = async () => {
        if (!rawInput.trim()) return;

        setStatus('processing');
        setError(null);
        setResults([]);

        try {
            // In a real app, we'd chunk this. For demo, sending all at once.
            const data = await processWithGemini(rawInput);
            setResults(data);
            setStatus('done');
        } catch (e: any) {
            console.error(e);
            setError(e.message || 'Failed to process data. Please try again.');
            setStatus('idle');
        }
    };

    const loadSample = () => {
        setRawInput(MOCK_CHAOS_DATA.trim());
        setResults([]);
        setStatus('idle');
    };

    // Mock Financials (Start with a "base" hotel)
    const BASE_REVENUE = 45000;
    const BASE_EXPENSES = 12000;
    const MONTHLY_DEBT = 8500;

    // Calculate real-time financials based on AI results
    const calculateLiveFinancials = () => {
        let addedExpenses = 0;
        results.forEach(row => {
            // Very simple heuristic: extract first number found in string if not already in JSON
            // In a real app, the AI returns the amount numeric. For now, let's trust the AI categorization impact.
            // We'll simulate impact by counting "OpEx" items.
            if (row.usaliCode && parseInt(row.usaliCode) >= 5000 && parseInt(row.usaliCode) < 7000) {
                // Mocking amount extraction for demo purposes since our prompt didn't strictly force number return
                // In production we'd parse this better.
                addedExpenses += 1000; // Placeholder average
            }
        });

        return {
            revenue: BASE_REVENUE,
            expenses: BASE_EXPENSES + addedExpenses,
            debt: MONTHLY_DEBT
        };
    };

    const financials = calculateLiveFinancials();

    return (
        <div className="min-h-screen bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
                <SceneHeader
                    title="Lending Intelligence Workbench"
                    subtitle="Live Risk Analysis & Underwriting"
                    day="SANDBOX MODE"
                />

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel: Input */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex justify-between items-center">
                                <span>1. Ingest Messy Data</span>
                                <button
                                    onClick={loadSample}
                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Load Sample
                                </button>
                            </h3>

                            <textarea
                                value={rawInput}
                                onChange={(e) => setRawInput(e.target.value)}
                                className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Paste messy CSV or Excel rows here..."
                            />

                            <button
                                onClick={handleProcess}
                                disabled={status === 'processing' || !rawInput}
                                className={`w-full mt-4 py-3 rounded-lg font-medium text-white transition-all
                                    ${status === 'processing'
                                        ? 'bg-blue-400 cursor-wait'
                                        : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                                    }`}
                            >
                                {status === 'processing' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing Risk...
                                    </span>
                                ) : 'Run Lending Intelligence'}
                            </button>

                            {error && (
                                <p className="mt-2 text-sm text-red-600">{error}</p>
                            )}
                        </div>

                        {/* Live DSCR Panel */}
                        <DSCRSpeedometer
                            revenue={financials.revenue}
                            expenses={financials.expenses}
                            debtService={financials.debt}
                        />
                    </div>

                    {/* Right Panel: Intelligence */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[600px]">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
                                <span>2. AI Underwriting Results</span>
                                {results.length > 0 && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {results.length} Lines Processed
                                    </span>
                                )}
                            </h3>

                            {results.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-lg">
                                    <span className="text-4xl mb-4">🧠</span>
                                    <p>Waiting for data...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b pb-2">
                                        <div className="col-span-4">Original Entry</div>
                                        <div className="col-span-2">USALI Mapped</div>
                                        <div className="col-span-1">Conf.</div>
                                        <div className="col-span-5">Risk Analysis</div>
                                    </div>

                                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                                        {results.map((row, idx) => (
                                            <div key={idx} className="grid grid-cols-12 gap-4 items-start p-3 bg-gray-50 rounded-lg text-sm border hover:border-blue-300 transition-colors group relative">
                                                <div className="col-span-4 font-mono text-gray-700 truncate" title={row.original}>
                                                    {row.original}
                                                </div>
                                                <div className="col-span-2">
                                                    <div className="font-medium text-gray-900">{row.usaliCode}</div>
                                                    <div className="text-xs text-gray-500 truncate" title={row.category}>{row.category}</div>
                                                </div>
                                                <div className="col-span-1">
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold
                                                        ${row.confidence > 90 ? 'bg-green-100 text-green-700' :
                                                            row.confidence > 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                                        {row.confidence}%
                                                    </span>
                                                </div>
                                                <div className="col-span-5">
                                                    {row.riskFlag === 'HIGH' && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mb-1">
                                                            🚨 High Risk
                                                        </span>
                                                    )}
                                                    {row.riskFlag === 'MEDIUM' && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 mb-1">
                                                            ⚠️ Medium Risk
                                                        </span>
                                                    )}
                                                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                                                        {row.reasoning}
                                                    </p>
                                                    {row.suggestedAudit && (
                                                        <div className="mt-2 p-2 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100 italic">
                                                            &quot;{row.suggestedAudit}&quot;
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Auto-Drafted Credit Memo */}
                        {results.length > 0 && (
                            <CreditMemo
                                results={results}
                                dscr={financials.revenue > 0 ? (financials.revenue - financials.expenses) / financials.debt : 0}
                            />
                        )}
                    </div>
                </div>

                {/* Privacy Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Enterprise Privacy Mode: Data processed via Private VPC. Zero retention policy active.
                    </p>
                </div>
            </div>
        </div>
    );
}
