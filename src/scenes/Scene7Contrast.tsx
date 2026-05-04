'use client';

import SceneHeader from '@/components/SceneHeader';
import ContinueButton from '@/components/ContinueButton';
import { contrastData } from '@/data/simulationData';

export default function Scene7Contrast() {
    return (
        <div className="max-w-5xl mx-auto">
            <SceneHeader
                title="The Contrast"
                subtitle="What This Replaced"
            />

            {/* Before/After Comparison */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Before */}
                <div className="bg-red-50 rounded-2xl border-2 border-red-200 overflow-hidden">
                    <div className="bg-red-100 border-b border-red-200 px-6 py-4">
                        <h3 className="text-xl font-bold text-red-800 flex items-center gap-2">
                            <span>😓</span> Without This System
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        {contrastData.before.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-red-100">
                                <span className="text-3xl">{item.icon}</span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">{item.metric}</p>
                                    <p className="text-lg font-semibold text-red-700">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* After */}
                <div className="bg-green-50 rounded-2xl border-2 border-green-200 overflow-hidden">
                    <div className="bg-green-100 border-b border-green-200 px-6 py-4">
                        <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                            <span>🚀</span> With AI-Augmented System
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        {contrastData.after.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-green-100">
                                <span className="text-3xl">{item.icon}</span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">{item.metric}</p>
                                    <p className="text-lg font-semibold text-green-700">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Impact Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">The Bottom Line</h3>
                    <p className="text-blue-100">Real impact on lending operations</p>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    <div className="text-center">
                        <p className="text-4xl font-bold mb-2">99.7%</p>
                        <p className="text-sm text-blue-100">Auto-Classification Rate</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold mb-2">5 min</p>
                        <p className="text-sm text-blue-100">vs 3 Weeks Processing</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold mb-2">100%</p>
                        <p className="text-sm text-blue-100">Data Verification</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold mb-2">2 wks</p>
                        <p className="text-sm text-blue-100">Earlier Anomaly Detection</p>
                    </div>
                </div>
            </div>

            {/* Key Principles */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">The Guiding Principles</h3>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold">1</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Source Systems Are Truth</h4>
                            <p className="text-sm text-gray-500">PMS, POS, Bank, STR—not borrower spreadsheets</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold">2</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Standardization Is Control</h4>
                            <p className="text-sm text-gray-500">USALI alignment enforced by system, not borrower</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold">3</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Latency Is Risk Exposure</h4>
                            <p className="text-sm text-gray-500">Compress time between event and awareness</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold">4</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Humans Decide, Machines Prepare</h4>
                            <p className="text-sm text-gray-500">AI surfaces exceptions; humans keep the keys</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
                <div className="inline-block bg-gray-100 rounded-full px-6 py-3 mb-6">
                    <p className="text-gray-600">
                        🎬 You&apos;ve just experienced the future of lending intelligence
                    </p>
                </div>
                <ContinueButton label="Start Over" />
            </div>
        </div>
    );
}
