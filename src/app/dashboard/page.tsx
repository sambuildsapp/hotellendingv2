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

// Calculate portfolio summary
function getPortfolioSummary() {
  const loanData = getLoanDisplayData();

  const totalBalance = loanData.reduce((sum, l) => sum + l.terms.currentBalance, 0);
  const totalNOI = loanData.reduce((sum, l) => sum + l.annualNOI, 0);
  const avgDSCR = loanData.reduce((sum, l) => sum + l.dscr, 0) / loanData.length;
  const performing = loanData.filter(l => l.status === 'PERFORMING').length;
  const watchlist = loanData.filter(l => l.status === 'WATCHLIST').length;
  const defaulted = loanData.filter(l => l.status === 'DEFAULT').length;

  return {
    totalBalance,
    totalNOI,
    avgDSCR,
    loanCount: loanData.length,
    performing,
    watchlist,
    defaulted,
  };
}

export default function Dashboard() {
  const router = useRouter();
  const loanData = getLoanDisplayData();
  const summary = getPortfolioSummary();

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Portfolio Dashboard</h1>
        <p className="text-slate-500 text-sm">
          Overview of {summary.loanCount} loans • {formatCurrency(summary.totalBalance)} total exposure
        </p>
      </header>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Loan Balance</span>
          <span className="text-2xl font-bold font-mono text-slate-900">{formatCurrency(summary.totalBalance)}</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Annual NOI</span>
          <span className="text-2xl font-bold font-mono text-slate-900">{formatCurrency(summary.totalNOI)}</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg. DSCR</span>
          <span className="text-2xl font-bold font-mono text-slate-900">{formatRatio(summary.avgDSCR)}</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Breakdown</span>
          <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
            <span style={{ color: 'var(--status-success)', fontWeight: 600 }}>
              {summary.performing} ✓
            </span>
            <span style={{ color: 'var(--status-warning)', fontWeight: 600 }}>
              {summary.watchlist} ⚠
            </span>
            <span style={{ color: 'var(--status-danger)', fontWeight: 600 }}>
              {summary.defaulted} ✗
            </span>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Loan Portfolio</h2>
            <p className="text-sm text-slate-500 mt-1">Click a loan to view details</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-tl-lg">Loan Name</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hotels</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Balance</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">NOI</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">DSCR</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Covenant</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Debt Yield</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-tr-lg">LTV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loanData.map(loan => (
                <tr
                  key={loan.id}
                  onClick={() => router.push(`/dashboard/dashboard/loans/${loan.id}`)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
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
                      {loan.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 align-middle text-sm text-slate-600">
                    {loan.hotels.length} hotel{loan.hotels.length > 1 ? 's' : ''} • {loan.totalKeys} keys
                  </td>
                  <td className="py-4 px-4 align-middle text-right font-mono text-sm font-medium text-slate-700">{formatCurrency(loan.terms.currentBalance)}</td>
                  <td className="py-4 px-4 align-middle text-right font-mono text-sm font-medium text-slate-700">{formatCurrency(loan.annualNOI)}</td>
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
                  <td className="py-4 px-4 align-middle text-right font-mono text-sm font-medium text-slate-700">
                    {loan.ltv !== null ? formatPercent(loan.ltv) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
