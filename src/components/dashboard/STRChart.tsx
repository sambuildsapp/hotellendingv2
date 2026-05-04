'use client';

/**
 * STR Market Performance Charts
 * Displays RevPAR Index trend and Occupancy/ADR comparisons vs Comp Set
 */

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';
import type { MarketData } from '@/lib/dashboard/types';
import { calculateSTRIndexes } from '@/lib/dashboard/calculations';

interface STRChartProps {
    data: MarketData[];
    title?: string;
}

/**
 * Format date for chart labels (e.g., "Jan 24")
 */
function formatPeriod(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date(date);
    return `${months[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`;
}

/**
 * RevPAR Index (RGI) trend chart with 100 reference line
 */
export function RGITrendChart({ data, title = 'RevPAR Index Trend' }: STRChartProps) {
    const chartData = data.map(d => ({
        period: formatPeriod(d.period),
        RGI: Number(calculateSTRIndexes(d).rgi.toFixed(1)),
    }));

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">{title}</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="period" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#64748b" fontSize={11} domain={[70, 130]} tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ color: '#1e293b', fontWeight: 600, marginBottom: '4px' }}
                    />
                    <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: '100', fill: '#f59e0b', fontSize: 10, position: 'insideBottomLeft', dy: -5 }} />
                    <Line
                        type="monotone"
                        dataKey="RGI"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

/**
 * Occupancy comparison chart (My Property vs Comp Set)
 */
export function OccupancyComparisonChart({ data, title = 'Occupancy: Property vs Comp Set' }: STRChartProps) {
    const chartData = data.map(d => ({
        period: formatPeriod(d.period),
        'My Property': Number((d.occupancyMyProp * 100).toFixed(1)),
        'Comp Set': Number((d.occupancyCompSet * 100).toFixed(1)),
    }));

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">{title}</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="period" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#64748b" fontSize={11} unit="%" domain={[40, 100]} tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ color: '#1e293b', fontWeight: 600, marginBottom: '4px' }}
                        formatter={(value: any) => [`${value}%`, 'Value']}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Line type="monotone" dataKey="My Property" stroke="#4f46e5" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Comp Set" stroke="#ec4899" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

/**
 * ADR comparison chart (My Property vs Comp Set)
 */
export function ADRComparisonChart({ data, title = 'ADR: Property vs Comp Set' }: STRChartProps) {
    const chartData = data.map(d => ({
        period: formatPeriod(d.period),
        'My Property': Number(d.adrMyProp.toFixed(0)),
        'Comp Set': Number(d.adrCompSet.toFixed(0)),
    }));

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">{title}</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="period" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#64748b" fontSize={11} unit="$" tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ color: '#1e293b', fontWeight: 600, marginBottom: '4px' }}
                        formatter={(value: any) => [`$${value}`, 'Value']}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Line type="monotone" dataKey="My Property" stroke="#4f46e5" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Comp Set" stroke="#ec4899" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
