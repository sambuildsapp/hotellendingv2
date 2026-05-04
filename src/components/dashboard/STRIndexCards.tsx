'use client';

/**
 * STR Index KPI Cards
 * Displays MPI, ARI, RGI with color coding based on performance
 */

import type { MarketData } from '@/lib/dashboard/types';
import { calculateSTRIndexes, calculateRunningAverage } from '@/lib/dashboard/calculations';

interface STRIndexCardsProps {
    currentData: MarketData;
    historicalData: MarketData[];
}

interface IndexCardProps {
    label: string;
    value: number;
    description: string;
    runningAvg3?: number;
    runningAvg12?: number;
}

function IndexCard({ label, value, description, runningAvg3, runningAvg12 }: IndexCardProps) {
    // Color based on value: > 100 = green, 95-100 = yellow, < 95 = red
    const getColor = (v: number) => {
        if (v >= 100) return 'text-emerald-600';
        if (v >= 95) return 'text-amber-600';
        return 'text-red-600';
    };

    const getBgColor = (v: number) => {
        if (v >= 100) return 'bg-emerald-50 border-emerald-100';
        if (v >= 95) return 'bg-amber-50 border-amber-100';
        return 'bg-red-50 border-red-100';
    };

    return (
        <div className={`rounded-lg p-4 border ${getBgColor(value)}`}>
            <div className="text-sm text-slate-500 mb-1 font-medium">{label}</div>
            <div className={`text-3xl font-bold font-mono ${getColor(value)}`}>
                {value.toFixed(1)}
            </div>
            <div className="text-xs text-slate-500 mt-1">{description}</div>
            {(runningAvg3 !== undefined || runningAvg12 !== undefined) && (
                <div className="mt-3 pt-3 border-t border-slate-200 flex gap-4">
                    {runningAvg3 !== undefined && (
                        <div className="text-xs">
                            <span className="text-slate-500">3-Mo Avg:</span>
                            <span className={`ml-1 ${getColor(runningAvg3)}`}>{runningAvg3.toFixed(1)}</span>
                        </div>
                    )}
                    {runningAvg12 !== undefined && (
                        <div className="text-xs">
                            <span className="text-slate-500">12-Mo Avg:</span>
                            <span className={`ml-1 ${getColor(runningAvg12)}`}>{runningAvg12.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function STRIndexCards({ currentData, historicalData }: STRIndexCardsProps) {
    const current = calculateSTRIndexes(currentData);

    // Calculate running averages
    const allIndexes = historicalData.map(d => calculateSTRIndexes(d));
    const mpiValues = allIndexes.map(i => i.mpi);
    const ariValues = allIndexes.map(i => i.ari);
    const rgiValues = allIndexes.map(i => i.rgi);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <IndexCard
                label="MPI (Occupancy Index)"
                value={current.mpi}
                description="Market Penetration Index"
                runningAvg3={calculateRunningAverage(mpiValues, 3)}
                runningAvg12={calculateRunningAverage(mpiValues, 12)}
            />
            <IndexCard
                label="ARI (Rate Index)"
                value={current.ari}
                description="Average Rate Index"
                runningAvg3={calculateRunningAverage(ariValues, 3)}
                runningAvg12={calculateRunningAverage(ariValues, 12)}
            />
            <IndexCard
                label="RGI (RevPAR Index)"
                value={current.rgi}
                description="Revenue Generation Index"
                runningAvg3={calculateRunningAverage(rgiValues, 3)}
                runningAvg12={calculateRunningAverage(rgiValues, 12)}
            />
        </div>
    );
}

/**
 * Current period performance metrics (Occ, ADR, RevPAR)
 */
interface PerformanceMetricsProps {
    data: MarketData;
}

export function PerformanceMetrics({ data }: PerformanceMetricsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {/* My Property */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="text-xs text-slate-500 mb-1 font-medium">My Occupancy</div>
                <div className="text-xl font-bold text-indigo-600 font-mono">
                    {(data.occupancyMyProp * 100).toFixed(1)}%
                </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="text-xs text-slate-500 mb-1 font-medium">My ADR</div>
                <div className="text-xl font-bold text-indigo-600 font-mono">
                    ${data.adrMyProp.toFixed(0)}
                </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="text-xs text-slate-500 mb-1 font-medium">My RevPAR</div>
                <div className="text-xl font-bold text-indigo-600 font-mono">
                    ${data.revparMyProp.toFixed(0)}
                </div>
            </div>
            {/* Comp Set */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="text-xs text-slate-500 mb-1 font-medium">Comp Set Occ</div>
                <div className="text-xl font-bold text-fuchsia-600 font-mono">
                    {(data.occupancyCompSet * 100).toFixed(1)}%
                </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="text-xs text-slate-500 mb-1 font-medium">Comp Set ADR</div>
                <div className="text-xl font-bold text-fuchsia-600 font-mono">
                    ${data.adrCompSet.toFixed(0)}
                </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="text-xs text-slate-500 mb-1 font-medium">Comp Set RevPAR</div>
                <div className="text-xl font-bold text-fuchsia-600 font-mono">
                    ${data.revparCompSet.toFixed(0)}
                </div>
            </div>
        </div>
    );
}
