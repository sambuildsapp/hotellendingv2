'use client';

import { mockHotels, mockLoans, mockFinancials, mockValuations } from '@/lib/dashboard/mock-data';
import {
    aggregateAnnualMetrics,
    formatCurrency,
    formatPercent
} from '@/lib/dashboard/calculations';
import Link from 'next/link';

// Get hotel display data
function getHotelDisplayData() {
    return mockHotels.map(hotel => {
        const loan = mockLoans.find(l => l.id === hotel.loanId);
        const financials = mockFinancials.filter(f => f.hotelId === hotel.id && f.scenario === 'ACTUAL');
        const metrics = aggregateAnnualMetrics(financials);
        const valuation = mockValuations.find(v => v.hotelId === hotel.id);

        return {
            ...hotel,
            loan,
            metrics,
            valuation,
        };
    });
}

export default function HotelsPage() {
    const hotelData = getHotelDisplayData();
    const totalKeys = hotelData.reduce((sum, h) => sum + h.keyCount, 0);

    return (
        <>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Hotels</h1>
                <p className="text-slate-500 text-sm">
                    {hotelData.length} properties • {totalKeys.toLocaleString()} total keys
                </p>
            </header>

            {/* Hotels Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hotel Name</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Brand</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Keys</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Linked Loan</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Occupancy</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">ADR</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">RevPAR</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Appraised Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotelData.map(hotel => (
                                <tr key={hotel.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                                    <td className="py-4 px-4 align-middle">
                                        <Link href={`/dashboard/hotels/${hotel.id}`} className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                                            {hotel.name}
                                        </Link>
                                        <div className="text-xs text-slate-500 mt-1">
                                            Built {hotel.yearBuilt}
                                            {hotel.yearRenovated && ` • Renovated ${hotel.yearRenovated}`}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 align-middle text-sm text-slate-600 font-medium">{hotel.brand}</td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-sm text-slate-700">{hotel.keyCount}</td>
                                    <td className="py-4 px-4 align-middle text-sm text-slate-500 max-w-[200px] truncate">
                                        {hotel.address}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-sm">
                                        {hotel.loan ? (
                                            <Link href={`/dashboard/loans/${hotel.loan.id}`} className="text-indigo-600 hover:underline">
                                                {hotel.loan.name}
                                            </Link>
                                        ) : (
                                            <span className="text-slate-400">Unencumbered</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-sm text-slate-700">
                                        {hotel.metrics.occupancy > 0 ? formatPercent(hotel.metrics.occupancy) : '—'}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-sm text-slate-700">
                                        {hotel.metrics.adr > 0 ? formatCurrency(hotel.metrics.adr) : '—'}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-sm text-slate-700">
                                        {hotel.metrics.revpar > 0 ? formatCurrency(hotel.metrics.revpar) : '—'}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-sm font-semibold text-slate-900">
                                        {hotel.valuation ? formatCurrency(hotel.valuation.appraisedValue) : '—'}
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
