'use client';

import { SimulationProvider, useSimulation } from '@/context/SimulationContext';
import ProgressBar from '@/components/ProgressBar';
import Scene1TriggerV2 from '@/scenes/Scene1TriggerV2';
import Scene2ChaseV2 from '@/scenes/Scene2ChaseV2';
import Scene3BrainV2 from '@/scenes/Scene3BrainV2';
import Scene4AuditorV2 from '@/scenes/Scene4AuditorV2';
import Scene5WatchdogV2 from '@/scenes/Scene5WatchdogV2';
import Scene6DashboardV2 from '@/scenes/Scene6DashboardV2';
import Scene7ContrastV2 from '@/scenes/Scene7ContrastV2';
import Scene8About from '@/scenes/Scene8About';

function SimulationContent() {
  const { currentScene } = useSimulation();

  const renderScene = () => {
    switch (currentScene) {
      case 1: return <Scene1TriggerV2 />;
      case 2: return <Scene2ChaseV2 />;
      case 3: return <Scene3BrainV2 />;
      case 4: return <Scene4AuditorV2 />;
      case 5: return <Scene5WatchdogV2 />;
      case 6: return <Scene6DashboardV2 />;
      case 7: return <Scene7ContrastV2 />;
      case 8: return <Scene8About />;
      default: return <Scene1TriggerV2 />;
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
              {currentScene < 6 && "Hotel Downtown | January 2026"}
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
