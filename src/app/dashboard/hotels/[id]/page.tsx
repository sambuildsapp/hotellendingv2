'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    mockHotels,
    mockLoans,
    mockFinancials,
    mockValuations,
    getMarketDataByHotelId,
    getLatestMarketData
} from '@/lib/dashboard/mock-data';
import {
    aggregateAnnualMetrics,
    formatCurrency,
    formatPercent
} from '@/lib/dashboard/calculations';
import { STRIndexCards, PerformanceMetrics } from '@/components/dashboard/STRIndexCards';
import { RGITrendChart, OccupancyComparisonChart, ADRComparisonChart } from '@/components/dashboard/STRChart';

export default function HotelDetailPage() {
    const params = useParams();
    const hotelId = params.id as string;

    // Find the hotel
    const hotel = mockHotels.find(h => h.id === hotelId);

    if (!hotel) {
        return (
            <div>
                <header className="page-header">
                    <h1 className="page-title">Hotel Not Found</h1>
                    <Link href="/dashboard/hotels" style={{ color: 'var(--status-info)' }}>← Back to Hotels</Link>
                </header>
            </div>
        );
    }

    // Get related data
    const loan = mockLoans.find(l => l.id === hotel.loanId);
    const financials = mockFinancials.filter(f => f.hotelId === hotel.id && f.scenario === 'ACTUAL');
    const metrics = aggregateAnnualMetrics(financials);
    const valuation = mockValuations.find(v => v.hotelId === hotel.id);
    const marketData = getMarketDataByHotelId(hotel.id);
    const latestMarketData = getLatestMarketData(hotel.id);

    // Calculate STR indexes
    const mpi = latestMarketData && latestMarketData.occupancyCompSet > 0
        ? (latestMarketData.occupancyMyProp / latestMarketData.occupancyCompSet) * 100
        : null;
    const ari = latestMarketData && latestMarketData.adrCompSet > 0
        ? (latestMarketData.adrMyProp / latestMarketData.adrCompSet) * 100
        : null;
    const rgi = latestMarketData && latestMarketData.revparCompSet > 0
        ? (latestMarketData.revparMyProp / latestMarketData.revparCompSet) * 100
        : null;

    return (
        <>
            <header className="mb-8">
                <Link href="/dashboard/hotels" className="text-slate-500 hover:text-indigo-600 text-sm mb-4 inline-flex items-center gap-1 no-underline">
                    ← Back to Hotels
                </Link>
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-slate-900">{hotel.name}</h1>
                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
                        {hotel.brand}
                    </span>
                </div>
                <p className="text-slate-500 mt-1">{hotel.address}</p>
            </header>

            {/* KPI Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Keys</span>
                    <span className="block text-2xl font-bold text-slate-900">{hotel.keyCount}</span>
                    <span className="block text-xs text-slate-400 mt-2">
                        Built {hotel.yearBuilt}
                        {hotel.yearRenovated && ` • Ren. ${hotel.yearRenovated}`}
                    </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Occupancy</span>
                    <span className="block text-2xl font-bold text-slate-900">
                        {metrics.occupancy > 0 ? formatPercent(metrics.occupancy) : '—'}
                    </span>
                    <span className={`block text-xs mt-2 font-medium ${mpi && mpi >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                        {mpi ? `MPI: ${mpi.toFixed(0)}` : '—'}
                    </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">ADR</span>
                    <span className="block text-2xl font-bold text-slate-900 font-mono">
                        {metrics.adr > 0 ? formatCurrency(metrics.adr) : '—'}
                    </span>
                    <span className={`block text-xs mt-2 font-medium ${ari && ari >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                        {ari ? `ARI: ${ari.toFixed(0)}` : '—'}
                    </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">RevPAR</span>
                    <span className="block text-2xl font-bold text-slate-900 font-mono">
                        {metrics.revpar > 0 ? formatCurrency(metrics.revpar) : '—'}
                    </span>
                    <span className={`block text-xs mt-2 font-medium ${rgi && rgi >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                        {rgi ? `RGI: ${rgi.toFixed(0)}` : '—'}
                    </span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

                {/* Property Details Card */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Property Details</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Brand</span>
                            <span className="text-slate-900 font-medium">{hotel.brand}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Management Company</span>
                            <span className="text-slate-900 font-medium">{hotel.managementCompany}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Asset Manager</span>
                            <span className="text-slate-900 font-medium">{hotel.assetManager}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Year Built</span>
                            <span className="text-slate-900 font-medium">{hotel.yearBuilt}</span>
                        </div>
                        {hotel.yearRenovated && (
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Year Renovated</span>
                                <span className="text-slate-900 font-medium">{hotel.yearRenovated}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-4 mt-2">
                            <span className="text-slate-500">Key Count</span>
                            <span className="text-slate-900 font-bold">{hotel.keyCount} rooms</span>
                        </div>
                    </div>
                </div>

                {/* Valuation Card */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Valuation</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {valuation ? (
                            <>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Appraised Value</span>
                                    <span className="text-lg font-bold text-indigo-600 font-mono">{formatCurrency(valuation.appraisedValue)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Cap Rate</span>
                                    <span className="text-slate-900 font-medium font-mono">{formatPercent(valuation.capRate)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Value Per Key</span>
                                    <span className="text-slate-900 font-medium font-mono">{formatCurrency(valuation.appraisedValue / hotel.keyCount)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Valuation Method</span>
                                    <span className="text-slate-900 font-medium">{valuation.valuationMethod}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-4 mt-2">
                                    <span className="text-slate-400 italic text-xs">As of {valuation.valuationDate.toLocaleDateString()}</span>
                                </div>
                            </>
                        ) : (
                            <p className="text-slate-400 text-sm italic py-4">No valuation data available</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Linked Loan Card */}
            {loan && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Linked Loan</h2>
                        <Link
                            href={`/dashboard/loans/${loan.id}`}
                            className="text-xs font-semibold text-indigo-600 hover:underline"
                        >
                            View Loan Details →
                        </Link>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Loan Name</div>
                            <div className="text-sm font-bold text-slate-900">{loan.name}</div>
                            <div className="text-xs text-slate-500">{loan.borrower.name}</div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</div>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${loan.status === 'PERFORMING' ? 'bg-green-100 text-green-700' :
                                    loan.status === 'WATCHLIST' ? 'bg-amber-100 text-amber-700' :
                                        'bg-red-100 text-red-700'
                                }`}>
                                {loan.status}
                            </span>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Balance</div>
                            <div className="text-sm font-bold text-slate-900 font-mono">{formatCurrency(loan.terms.currentBalance)}</div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Maturity</div>
                            <div className="text-sm font-bold text-slate-900">{loan.terms.maturityDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Financial Performance */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                    <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Financial Performance (2025 Actual)</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Revenue Side */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Revenue & Profit</h3>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Total Revenue</span>
                            <span className="text-slate-900 font-bold font-mono">{formatCurrency(metrics.totalRevenue)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Departmental Profit</span>
                            <span className="text-slate-900 font-medium font-mono">{formatCurrency(metrics.departmentalProfit)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">GOP</span>
                            <span className="text-slate-900 font-medium font-mono">{formatCurrency(metrics.grossOperatingProfit)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">EBITDA</span>
                            <span className="text-slate-900 font-medium font-mono">{formatCurrency(metrics.ebitda)}</span>
                        </div>
                        <div className="flex justify-between items-center text-base border-t-2 border-slate-900 pt-3 mt-2">
                            <span className="font-bold text-slate-900 uppercase text-xs tracking-wider">NOI</span>
                            <span className="font-bold text-green-600 font-mono">
                                {formatCurrency(metrics.noi)}
                            </span>
                        </div>
                    </div>

                    {/* Key Ratios */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Performance Ratios</h3>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">Occupancy</span>
                            <span className="text-slate-900 font-medium font-mono">{formatPercent(metrics.occupancy)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">ADR</span>
                            <span className="text-slate-900 font-medium font-mono">{formatCurrency(metrics.adr)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">RevPAR</span>
                            <span className="text-slate-900 font-medium font-mono">{formatCurrency(metrics.revpar)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                            <span className="text-slate-500">GOP Margin</span>
                            <span className="text-slate-900 font-medium font-mono text-indigo-600">
                                {metrics.totalRevenue > 0 ? formatPercent(metrics.grossOperatingProfit / metrics.totalRevenue) : '—'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm pt-2">
                            <span className="text-slate-500">NOI Margin</span>
                            <span className="text-slate-900 font-bold font-mono text-green-600">
                                {metrics.totalRevenue > 0 ? formatPercent(metrics.noi / metrics.totalRevenue) : '—'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Market Data Section */}
            {latestMarketData && marketData.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        Market Performance
                        <span className="text-xs font-normal text-slate-400 py-0.5 px-2 bg-slate-100 rounded-full tracking-wider uppercase">STR Data</span>
                    </h2>

                    {/* Current Performance Metrics */}
                    <div style={{ marginBottom: '24px' }}>
                        <PerformanceMetrics data={latestMarketData} />
                    </div>

                    {/* STR Index Cards */}
                    <div style={{ marginBottom: '24px' }}>
                        <STRIndexCards
                            currentData={latestMarketData}
                            historicalData={marketData}
                        />
                    </div>

                    {/* Charts Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '24px'
                    }}>
                        <RGITrendChart data={marketData} />
                        <OccupancyComparisonChart data={marketData} />
                        <ADRComparisonChart data={marketData} />
                    </div>
                </div>
            )}
        </>
    );
}
