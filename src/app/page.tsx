import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <span className="text-6xl mb-4 block">🏨</span>
                    <h1 className="text-4xl font-bold text-white mb-4">AI-Augmented Hotel Lending</h1>
                    <p className="text-slate-400 text-lg">Select a demonstration mode</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* V1: Efficiency Demo */}
                    <Link href="/v1" className="group relative block p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-1 rounded">v1.0</span>
                        </div>
                        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">⚡️</div>
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Efficiency Engine</h2>
                        <p className="text-slate-400 mb-6">
                            Focuses on <strong>accuracy and structure</strong>. AI eliminates back-office processing bottlenecks, acting as a 10x analyst capacity multiplier.
                        </p>
                        <div className="flex items-center text-blue-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                            Launch Demo <span className="ml-2">→</span>
                        </div>
                    </Link>

                    {/* V2: Risk Intelligence Demo */}
                    <Link href="/v2" className="group relative block p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-mono bg-purple-900 text-purple-200 px-2 py-1 rounded border border-purple-700">v2.0 Beta</span>
                        </div>
                        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🧠</div>
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Risk Intelligence</h2>
                        <p className="text-slate-400 mb-6">
                            Focuses on <strong>risk mitigation</strong>. Immediate processing prevents fraud and detects high-stakes anomalies before they compound.
                        </p>
                        <div className="flex items-center text-purple-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                            Launch Investor Preview <span className="ml-2">→</span>
                        </div>
                    </Link>

                    {/* Sandbox: Workbench Demo */}
                    <Link href="/sandbox" className="group relative block p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-amber-500 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-mono bg-amber-900 text-amber-200 px-2 py-1 rounded border border-amber-700">Workbench</span>
                        </div>
                        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🛠️</div>
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Lending Workbench</h2>
                        <p className="text-slate-400 mb-6">
                            A <strong>live playground</strong> for messy data ingestion and real-time AI underwriting risk analysis.
                        </p>
                        <div className="flex items-center text-amber-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                            Launch Workbench <span className="ml-2">→</span>
                        </div>
                    </Link>

                    {/* V4: Portfolio Dashboard */}
                    <Link href="/dashboard" className="group relative block p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-mono bg-emerald-900 text-emerald-200 px-2 py-1 rounded border border-emerald-700">Internal</span>
                        </div>
                        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">📊</div>
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Portfolio Hub</h2>
                        <p className="text-slate-400 mb-6">
                            A <strong>global view</strong> of portfolio health, covenants, and risk signals across all assets.
                        </p>
                        <div className="flex items-center text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                            Open Dashboard <span className="ml-2">→</span>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-600 text-sm">
                        Built for the Modern Lender • <span className="font-mono">v2.0.0-beta</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
