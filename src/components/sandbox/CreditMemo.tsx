'use client';

import React from 'react';
import { ProcessedRow } from '@/app/actions/process-entry';

interface CreditMemoProps {
    results: ProcessedRow[];
    dscr: number;
}

export default function CreditMemo({ results, dscr }: CreditMemoProps) {
    if (results.length === 0) return null;

    const highRiskItems = results.filter(r => r.riskFlag === 'HIGH');
    const mediumRiskItems = results.filter(r => r.riskFlag === 'MEDIUM');

    const dscrStatus = dscr < 1.0 ? 'CRITICAL DEFAULT' : dscr < 1.25 ? 'COVENANT BREACH' : 'PASS';
    const dscrColor = dscr < 1.25 ? 'text-red-700' : 'text-green-700';

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>

            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="text-xl">📝</span> Auto-Drafted Credit Memo
            </h3>

            <div className="prose prose-sm max-w-none text-slate-800 space-y-4">
                <p className="font-serif leading-relaxed">
                    <strong>Subject Property Analysis:</strong><br />
                    Based on the current period financials, the property is generating a DSCR of
                    <strong className={`ml-1 ${dscrColor}`}>{dscr.toFixed(2)}x</strong>,
                    indicative of a <span className="font-semibold">{dscrStatus}</span> scenario.
                </p>

                {(highRiskItems.length > 0 || mediumRiskItems.length > 0) && (
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <p className="font-semibold text-slate-700 mb-2">Key Risk Drivers:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            {highRiskItems.map((item, i) => (
                                <li key={`high-${i}`} className="text-red-700">
                                    <strong>{item.category}:</strong> Anomaly detected in "{item.original}" ({item.reasoning}).
                                </li>
                            ))}
                            {mediumRiskItems.slice(0, 2).map((item, i) => (
                                <li key={`med-${i}`} className="text-amber-700">
                                    <strong>{item.category}:</strong> Review required for "{item.original}".
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <p className="font-serif leading-relaxed italic text-slate-600 border-l-2 border-slate-300 pl-4 mt-4">
                    <strong>Recommendation:</strong> Request immediate clarification on the flagged
                    {highRiskItems.length > 0 ? " high-risk items" : " items"} above.
                    Reclassifying non-recurring expenses to CapEx may improve DSCR coverage.
                </p>
            </div>

            <div className="mt-6 flex gap-3">
                <button className="text-xs bg-white border border-gray-300 hover:bg-gray-50 px-3 py-2 rounded font-medium text-gray-700 shadow-sm transition-colors">
                    📄 Export as PDF
                </button>
                <button className="text-xs bg-blue-600 hover:bg-blue-700 border border-transparent px-3 py-2 rounded font-medium text-white shadow-sm transition-colors">
                    📧 Email to Borrower
                </button>
            </div>
        </div>
    );
}
