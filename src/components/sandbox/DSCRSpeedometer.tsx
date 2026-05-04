'use client';

import React from 'react';

interface DSCRProps {
    revenue: number;
    expenses: number;
    debtService: number;
}

export default function DSCRSpeedometer({ revenue, expenses, debtService }: DSCRProps) {
    const noi = revenue - expenses;
    const dscr = debtService > 0 ? noi / debtService : 0;

    // Cap visual range for speedometer (0.5x to 2.5x)
    const minVal = 0.5;
    const maxVal = 2.0;
    const percentage = Math.min(Math.max((dscr - minVal) / (maxVal - minVal), 0), 1) * 100;

    const getColor = (value: number) => {
        if (value < 1.0) return 'text-red-600';
        if (value < 1.25) return 'text-amber-600';
        return 'text-green-600';
    };

    const getStatus = (value: number) => {
        if (value < 1.0) return 'DEFAULT';
        if (value < 1.25) return 'BREACH';
        return 'PASS';
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 relative overflow-hidden">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Live DSCR Impact</h4>

            <div className="flex items-end justify-between">
                <div>
                    <div className={`text-4xl font-bold transition-all duration-500 ${getColor(dscr)}`}>
                        {dscr.toFixed(2)}x
                    </div>
                    <div className="text-xs text-gray-400 font-medium mt-1">
                        Status: <span className={getColor(dscr)}>{getStatus(dscr)}</span>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                        ${noi.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Net Operating Income</div>
                </div>
            </div>

            {/* Speedometer Bar */}
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden relative">
                {/* Zones */}
                <div className="absolute left-0 w-[33%] h-full bg-red-300 opacity-50"></div>
                <div className="absolute left-[33%] w-[17%] h-full bg-amber-300 opacity-50"></div>
                <div className="absolute left-[50%] w-[50%] h-full bg-green-300 opacity-50"></div>

                {/* Indicator */}
                <div
                    className="absolute h-full w-1 bg-black transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{ left: `${percentage}%` }}
                ></div>
            </div>

            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>0.5x</span>
                <span>1.0x</span>
                <span>1.25x</span>
                <span>2.0x+</span>
            </div>

            {/* Context Stats */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t pt-2">
                <div>
                    <span className="text-gray-500">Revenue:</span>
                    <span className="ml-1 text-gray-900 font-mono">${revenue.toLocaleString()}</span>
                </div>
                <div className="text-right">
                    <span className="text-gray-500">Expenses:</span>
                    <span className="ml-1 text-gray-900 font-mono">${expenses.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
