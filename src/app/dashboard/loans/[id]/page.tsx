'use client';

import { useParams } from 'next/navigation';
import { mockLoans, mockHotels, mockFinancials, mockValuations } from '@/lib/dashboard/mock-data';
import {
    calculateLoanPerformance,
    calculateOperatingMetrics,
    aggregateAnnualMetrics,
    calculateRemainingTermMonths,
    formatCurrency,
    formatPercent,
    formatRatio
} from '@/lib/dashboard/calculations';
import Link from 'next/link';

export default function LoanDetailPage() {
    const params = useParams();
    const loanId = params.id as string;

    // Find the loan
    const loan = mockLoans.find(l => l.id === loanId);

    if (!loan) {
        return (
            <div>
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Loan Not Found</h1>
                    <Link href="/dashboard" className="text-indigo-600 hover:underline">← Back to Dashboard</Link>
                </header>
            </div>
        );
    }

    // Get related data
    const loanHotels = mockHotels.filter(h => loan.hotelIds.includes(h.id));
    const loanFinancials = mockFinancials.filter(f =>
        loanHotels.some(h => h.id === f.hotelId) && f.scenario === 'ACTUAL'
    );
    const annualMetrics = aggregateAnnualMetrics(loanFinancials);
    const valuation = mockValuations.find(v => loanHotels.some(h => h.id === v.hotelId));
    const performance = calculateLoanPerformance(loan, annualMetrics.noi, loanHotels, valuation);

    const effectiveRate = loan.terms.interestType === 'FLOATING' && loan.terms.sofrRate
        ? loan.terms.interestRate + loan.terms.sofrRate
        : loan.terms.interestRate;

    return (
        <>
            <header className="mb-8">
                <Link href="/dashboard" className="text-slate-500 hover:text-indigo-600 text-sm mb-4 inline-flex items-center gap-1 no-underline">
                    ← Back to Dashboard
                </Link>
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-slate-900">{loan.name}</h1>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${loan.status === 'PERFORMING' ? 'bg-green-100 text-green-700' :
                            loan.status === 'WATCHLIST' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                        }`}>
                        {loan.status}
                    </span>
                </div>
                <p className="text-slate-500 mt-1">{loan.borrower.name}</p>
            </header>

            {/* KPI Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Balance</span>
                    <span className="block text-2xl font-bold text-slate-900 font-mono">{formatCurrency(loan.terms.currentBalance)}</span>
                    <span className="block text-xs text-slate-400 mt-2">
                        of {formatCurrency(loan.terms.originalPrincipal)}
                    </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">DSCR</span>
                    <span className={`block text-2xl font-bold font-mono ${performance.dscr >= 1.2 ? 'text-green-600' :
                            performance.dscr >= 1.0 ? 'text-amber-600' :
                                'text-red-600'
                        }`}>
                        {formatRatio(performance.dscr)}
                    </span>
                    <span className={`block text-xs mt-2 font-medium ${performance.covenantDSCRStatus === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>
                        {performance.covenantDSCRStatus === 'PASS' ? '✓ Covenant Pass' : '✗ Covenant Breach'}
                    </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Debt Yield</span>
                    <span className="block text-2xl font-bold text-slate-900 font-mono">{formatPercent(performance.debtYield)}</span>
                    <span className="block text-xs text-slate-400 mt-2">
                        Min: {formatPercent(loan.covenants.minDebtYield)}
                    </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">LTV</span>
                    <span className="block text-2xl font-bold text-slate-900 font-mono">
                        {performance.ltv !== null ? formatPercent(performance.ltv) : 'N/A'}
                    </span>
                    {valuation && (
                        <span className="block text-xs text-slate-400 mt-2">
                            Value: {formatCurrency(valuation.appraisedValue)}
                        </span>
                    )}
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

                {/* Loan Terms Card */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Loan Terms</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Interest Type</span>
                            <span className="text-slate-900 font-medium">{loan.terms.interestType}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Interest Rate</span>
                            <span className="text-slate-900 font-bold font-mono">
                                {loan.terms.interestType === 'FLOATING'
                                    ? `SOFR + ${formatPercent(loan.terms.interestRate)} = ${formatPercent(effectiveRate)}`
                                    : formatPercent(effectiveRate)
                                }
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Maturity Date</span>
                            <span className="text-slate-900 font-medium">{loan.terms.maturityDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Remaining Term</span>
                            <span className="text-slate-900 font-medium">{calculateRemainingTermMonths(loan.terms.maturityDate)} months</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Recourse</span>
                            <span className="text-slate-900 font-medium">{loan.terms.isRecourse ? 'Yes' : 'Non-Recourse'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Prepayment</span>
                            <span className="text-slate-900 font-medium text-right">
                                {loan.terms.prepaymentAllowed
                                    ? loan.terms.yieldMaintenance
                                        ? `Allowed (${formatPercent(loan.terms.yieldMaintenance)} YM)`
                                        : 'Allowed'
                                    : 'Locked Out'
                                }
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-4 mt-2">
                            <span className="text-slate-500">Reserve Requirement</span>
                            <span className="text-slate-900 font-bold font-mono">{formatPercent(loan.terms.reserveRequirementPct)}</span>
                        </div>
                    </div>
                </div>

                {/* Covenant Status Card */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Covenant Compliance</h2>
                    </div>
                    <div className="p-6 space-y-8">
                        {/* DSCR Covenant */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">DSCR Covenant</span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${performance.covenantDSCRStatus === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {performance.covenantDSCRStatus}
                                </span>
                            </div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-3xl font-bold text-slate-900 font-mono tracking-tighter">
                                    {formatRatio(performance.dscr)}
                                </span>
                                <span className="text-xs text-slate-400 font-medium pb-1">
                                    Min: {formatRatio(loan.covenants.minDSCR)}
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${performance.dscr >= loan.covenants.minDSCR ? 'bg-green-500' : 'bg-red-500'}`}
                                    style={{ width: `${Math.min((performance.dscr / loan.covenants.minDSCR) * 50, 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* Debt Yield Covenant */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Debt Yield Covenant</span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${performance.covenantDebtYieldStatus === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {performance.covenantDebtYieldStatus}
                                </span>
                            </div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-3xl font-bold text-slate-900 font-mono tracking-tighter">
                                    {formatPercent(performance.debtYield)}
                                </span>
                                <span className="text-xs text-slate-400 font-medium pb-1">
                                    Min: {formatPercent(loan.covenants.minDebtYield)}
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${performance.debtYield >= loan.covenants.minDebtYield ? 'bg-green-500' : 'bg-red-500'}`}
                                    style={{ width: `${Math.min((performance.debtYield / loan.covenants.minDebtYield) * 50, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hotels Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Collateral Hotels</h2>
                    <span className="text-xs text-slate-500 font-medium">
                        {loanHotels.length} hotel{loanHotels.length > 1 ? 's' : ''} • {loanHotels.reduce((s, h) => s + h.keyCount, 0)} total keys
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hotel Name</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Brand</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Keys</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Year Built</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Loan/Key</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loanHotels.map(hotel => (
                                <tr key={hotel.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                                    <td className="py-4 px-4 align-middle font-semibold text-slate-900">
                                        <Link href={`/dashboard/hotels/${hotel.id}`} className="hover:text-indigo-600 transition-colors">
                                            {hotel.name}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-4 align-middle text-sm text-slate-500 max-w-[200px] truncate">{hotel.address}</td>
                                    <td className="py-4 px-4 align-middle text-sm text-slate-600">{hotel.brand}</td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-sm text-slate-700">{hotel.keyCount}</td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-sm text-slate-700">
                                        {hotel.yearBuilt}
                                        {hotel.yearRenovated && <span className="text-slate-400"> (Ren. {hotel.yearRenovated})</span>}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-sm font-semibold text-slate-900">
                                        {formatCurrency(loan.terms.currentBalance / loanHotels.reduce((s, h) => s + h.keyCount, 0))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                    <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Financial Performance (2025 Actual)</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Revenue Side */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Revenue & Profit</h3>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Total Revenue</span>
                            <span className="text-slate-900 font-bold font-mono">{formatCurrency(annualMetrics.totalRevenue)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Departmental Profit</span>
                            <span className="text-slate-900 font-medium font-mono">{formatCurrency(annualMetrics.departmentalProfit)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">GOP</span>
                            <span className="text-slate-900 font-medium font-mono">{formatCurrency(annualMetrics.grossOperatingProfit)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">EBITDA</span>
                            <span className="text-slate-900 font-medium font-mono">{formatCurrency(annualMetrics.ebitda)}</span>
                        </div>
                        <div className="flex justify-between items-center text-base border-t-2 border-slate-900 pt-3 mt-2">
                            <span className="font-bold text-slate-900 uppercase text-xs tracking-wider">NOI</span>
                            <span className="font-bold text-green-600 font-mono">
                                {formatCurrency(annualMetrics.noi)}
                            </span>
                        </div>
                    </div>

                    {/* Key Ratios */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Performance Ratios</h3>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Occupancy</span>
                            <span className="text-slate-900 font-medium font-mono">{formatPercent(annualMetrics.occupancy)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">ADR</span>
                            <span className="text-slate-900 font-medium font-mono">{formatCurrency(annualMetrics.adr)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">RevPAR</span>
                            <span className="text-slate-900 font-medium font-mono">{formatCurrency(annualMetrics.revpar)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">GOP Margin</span>
                            <span className="text-slate-900 font-medium font-mono text-indigo-600">
                                {formatPercent(annualMetrics.grossOperatingProfit / annualMetrics.totalRevenue)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm pt-2">
                            <span className="text-slate-500">NOI Margin</span>
                            <span className="text-slate-900 font-bold font-mono text-green-600">
                                {formatPercent(annualMetrics.noi / annualMetrics.totalRevenue)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
