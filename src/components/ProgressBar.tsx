'use client';

import { useSimulation, Scene } from '@/context/SimulationContext';
import { sceneMetadata } from '@/data/simulationData';

export default function ProgressBar() {
    const { currentScene, goToScene } = useSimulation();

    return (
        <div className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    {sceneMetadata.map((scene, index) => (
                        <div key={scene.id} className="flex items-center">
                            {/* Scene Marker */}
                            <button
                                onClick={() => goToScene(scene.id as Scene)}
                                className="relative group flex flex-col items-center transition-all cursor-pointer"
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                    ${scene.id === currentScene
                                            ? 'bg-blue-600 text-white scale-110 shadow-lg'
                                            : scene.id < currentScene
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                        }
                  `}
                                >
                                    {scene.id < currentScene ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        scene.id
                                    )}
                                </div>

                                {/* Tooltip */}
                                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 text-center shadow-lg">
                                        <p className="font-semibold">{scene.title}</p>
                                        <p className="text-gray-300">{scene.subtitle}</p>
                                    </div>
                                </div>
                            </button>

                            {/* Connector Line */}
                            {index < sceneMetadata.length - 1 && (
                                <div className={`w-12 md:w-20 h-1 mx-2 rounded ${scene.id < currentScene ? 'bg-green-500' : 'bg-gray-200'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
