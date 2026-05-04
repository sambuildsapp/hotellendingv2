'use client';

import { SimulationProvider, useSimulation } from '@/context/SimulationContext';
import ProgressBar from '@/components/ProgressBar';
import Scene1Trigger from '@/scenes/Scene1Trigger';
import Scene2Chase from '@/scenes/Scene2Chase';
import Scene3Brain from '@/scenes/Scene3Brain';
import Scene4Auditor from '@/scenes/Scene4Auditor';
import Scene5Watchdog from '@/scenes/Scene5Watchdog';
import Scene6Dashboard from '@/scenes/Scene6Dashboard';
import Scene7Contrast from '@/scenes/Scene7Contrast';

function SimulationContent() {
  const { currentScene } = useSimulation();

  const renderScene = () => {
    switch (currentScene) {
      case 1: return <Scene1Trigger />;
      case 2: return <Scene2Chase />;
      case 3: return <Scene3Brain />;
      case 4: return <Scene4Auditor />;
      case 5: return <Scene5Watchdog />;
      case 6: return <Scene6Dashboard />;
      case 7: return <Scene7Contrast />;
      default: return <Scene1Trigger />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏨</span>
              <div>
                <h1 className="text-lg font-bold text-gray-900">AI-Augmented Lending Intelligence</h1>
                <p className="text-sm text-gray-500">Interactive Simulation</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Hotel Downtown | January 2026
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <ProgressBar />

      {/* Scene Content */}
      <main className="py-8 px-6">
        {renderScene()}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
          A demonstration of AI-powered lending operations • All data is simulated
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <SimulationProvider>
      <SimulationContent />
    </SimulationProvider>
  );
}
