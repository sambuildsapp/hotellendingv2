'use client';

import { useState } from 'react';
import { mockHotels, mockMarketData, getMarketDataByHotelId, getLatestMarketData } from '@/lib/dashboard/mock-data';
import { formatPercent, formatCurrency } from '@/lib/dashboard/calculations';
import { STRIndexCards, PerformanceMetrics } from '@/components/dashboard/STRIndexCards';
import { RGITrendChart, OccupancyComparisonChart, ADRComparisonChart } from '@/components/dashboard/STRChart';

import { type Hotel, type MarketData } from '@/lib/dashboard/types';

interface HotelMarketSummary {
    hotel: Hotel;
    latestData: MarketData;
    mpi: number;
    ari: number;
    rgi: number;
}

export default function MarketPage() {
    const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);

    // Get summary data for each hotel (latest month)
    const hotelSummaries: HotelMarketSummary[] = mockHotels.map(hotel => {
        const latestData = getLatestMarketData(hotel.id);
        if (!latestData) return null;

        const mpi = latestData.occupancyCompSet > 0
            ? (latestData.occupancyMyProp / latestData.occupancyCompSet) * 100
            : 0;
        const ari = latestData.adrCompSet > 0
            ? (latestData.adrMyProp / latestData.adrCompSet) * 100
            : 0;
        const rgi = latestData.revparCompSet > 0
            ? (latestData.revparMyProp / latestData.revparCompSet) * 100
            : 0;

        return {
            hotel,
            latestData,
            mpi,
            ari,
            rgi,
        };
    }).filter((item): item is HotelMarketSummary => item !== null);

    // Get detailed data for selected hotel
    const selectedHotel = selectedHotelId
        ? mockHotels.find(h => h.id === selectedHotelId)
        : null;
    const selectedHistoricalData = selectedHotelId
        ? getMarketDataByHotelId(selectedHotelId)
        : [];
    const selectedLatestData = selectedHotelId
        ? getLatestMarketData(selectedHotelId)
        : null;

    return (
        <>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Market Data</h1>
                <p className="text-slate-500 text-sm">
                    STR performance indexes vs. competitive set
                </p>
            </header>

            {/* Legend */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs">
                    <div className="text-slate-600">
                        <strong className="text-slate-900">MPI</strong> (Market Penetration Index) = Occupancy vs Comp Set
                    </div>
                    <div className="text-slate-600">
                        <strong className="text-slate-900">ARI</strong> (Average Rate Index) = ADR vs Comp Set
                    </div>
                    <div className="text-slate-600">
                        <strong className="text-slate-900">RGI</strong> (Revenue Generation Index) = RevPAR vs Comp Set
                    </div>
                    <div className="ml-auto text-slate-400 italic">
                        Index &gt; 100 = Outperforming • Click row to view trends
                    </div>
                </div>
            </div>

            {/* Market Data Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hotel</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">My Occ</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Comp Occ</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">MPI</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">My ADR</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Comp ADR</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">ARI</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">My RevPAR</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Comp RevPAR</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">RGI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotelSummaries.map((data) => (
                                <tr
                                    key={data.hotel.id}
                                    onClick={() => setSelectedHotelId(
                                        selectedHotelId === data.hotel.id ? null : data.hotel.id
                                    )}
                                    className={`cursor-pointer transition-colors border-b border-slate-100 last:border-0 ${selectedHotelId === data.hotel.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
                                        }`}
                                >
                                    <td className="py-4 px-4 align-middle font-semibold text-slate-900">{data.hotel.name}</td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-xs text-slate-700">
                                        {formatPercent(data.latestData.occupancyMyProp)}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-xs text-slate-400">
                                        {formatPercent(data.latestData.occupancyCompSet)}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-center">
                                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold font-mono ${data.mpi >= 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {data.mpi.toFixed(0)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-xs text-slate-700">
                                        {formatCurrency(data.latestData.adrMyProp)}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-xs text-slate-400">
                                        {formatCurrency(data.latestData.adrCompSet)}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-center">
                                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold font-mono ${data.ari >= 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {data.ari.toFixed(0)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-xs text-slate-700">
                                        {formatCurrency(data.latestData.revparMyProp)}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-right font-mono text-xs text-slate-400">
                                        {formatCurrency(data.latestData.revparCompSet)}
                                    </td>
                                    <td className="py-4 px-4 align-middle text-center">
                                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold font-mono ${data.rgi >= 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {data.rgi.toFixed(0)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Detail Section - Shows when a hotel is selected */}
                {selectedHotel && selectedLatestData && selectedHistoricalData.length > 0 && (
                    <div className="mt-12 bg-white border border-slate-200 rounded-xl p-8 shadow-md">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">
                            {selectedHotel.name} - Market Performance
                        </h2>

                        {/* Current Performance Metrics */}
                        <div style={{ marginBottom: '24px' }}>
                            <PerformanceMetrics data={selectedLatestData} />
                        </div>

                        {/* STR Index Cards */}
                        <div style={{ marginBottom: '24px' }}>
                            <STRIndexCards
                                currentData={selectedLatestData}
                                historicalData={selectedHistoricalData}
                            />
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <RGITrendChart data={selectedHistoricalData} />
                            <OccupancyComparisonChart data={selectedHistoricalData} />
                            <ADRComparisonChart data={selectedHistoricalData} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
