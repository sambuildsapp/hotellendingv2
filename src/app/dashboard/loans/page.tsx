'use client';

import { mockLoans, mockHotels, mockFinancials, mockValuations } from '@/lib/dashboard/mock-data';
import {
    calculateLoanPerformance,
    aggregateAnnualMetrics,
    formatCurrency,
    formatPercent,
    formatRatio
} from '@/lib/dashboard/calculations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Calculate all loan data for display
function getLoanDisplayData() {
    return mockLoans.map(loan => {
        const loanHotels = mockHotels.filter(h => loan.hotelIds.includes(h.id));
        const loanFinancials = mockFinancials.filter(f =>
            loanHotels.some(h => h.id === f.hotelId) && f.scenario === 'ACTUAL'
        );
        const annualMetrics = aggregateAnnualMetrics(loanFinancials);
        const valuation = mockValuations.find(v => loanHotels.some(h => h.id === v.hotelId));
        const performance = calculateLoanPerformance(loan, annualMetrics.noi, loanHotels, valuation);

        return {
            ...loan,
            hotels: loanHotels,
            totalKeys: loanHotels.reduce((sum, h) => sum + h.keyCount, 0),
            annualRevenue: annualMetrics.totalRevenue,
            annualNOI: annualMetrics.noi,
            ...performance,
        };
    });
}

export default function LoansPage() {
    const router = useRouter();
    const loanData = getLoanDisplayData();

    return (
        <>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Loans</h1>
                <p className="text-slate-500 text-sm">
                    All {loanData.length} loans in the portfolio
                </p>
            </header>

            {/* Loans Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Loan Name</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Interest Type</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Balance</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Rate</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Maturity</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">DSCR</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Covenant</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Debt Yield</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loanData.map(loan => {
                                const effectiveRate = loan.terms.interestType === 'FLOATING' && loan.terms.sofrRate
                                    ? loan.terms.interestRate + loan.terms.sofrRate
                                    : loan.terms.interestRate;

                                return (
                                    <tr
                                        key={loan.id}
                                        onClick={() => router.push(`/dashboard/loans/${loan.id}`)}
                                        className="cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                                    >
                                        <td className="py-4 px-4 align-middle">
                                            <span className="font-semibold text-slate-900">
                                                {loan.name}
                                            </span>
                                            <div className="text-xs text-slate-500 mt-1">
                                                {loan.borrower.name}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 align-middle">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${loan.status === 'PERFORMING' ? 'bg-green-100 text-green-700' :
                                                    loan.status === 'WATCHLIST' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${loan.status === 'PERFORMING' ? 'bg-green-500' :
                                                        loan.status === 'WATCHLIST' ? 'bg-amber-500' :
                                                            'bg-red-500'
                                                    }`}></span>
                                                {loan.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 align-middle text-sm text-slate-600">
                                            {loan.terms.interestType}
                                            {loan.terms.interestType === 'FLOATING' && (
                                                <span className="text-slate-400"> (SOFR+)</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 align-middle text-right font-mono text-sm font-medium text-slate-700">{formatCurrency(loan.terms.currentBalance)}</td>
                                        <td className="py-4 px-4 align-middle text-right font-mono text-sm font-medium text-slate-700">
                                            {formatPercent(effectiveRate)}
                                        </td>
                                        <td className="py-4 px-4 align-middle text-sm text-slate-600">
                                            {loan.terms.maturityDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className={`py-4 px-4 align-middle text-right font-mono text-sm font-semibold ${loan.dscr >= 1.2 ? 'text-green-600' :
                                                loan.dscr >= 1.0 ? 'text-amber-600' :
                                                    'text-red-600'
                                            }`}>
                                            {formatRatio(loan.dscr)}
                                        </td>
                                        <td className="py-4 px-4 align-middle text-center">
                                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${loan.covenantDSCRStatus === 'PASS' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                {loan.covenantDSCRStatus === 'PASS' ? '✓' : '✗'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 align-middle text-right font-mono text-sm font-medium text-slate-700">
                                            {formatPercent(loan.debtYield)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
