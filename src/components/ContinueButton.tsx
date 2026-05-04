'use client';

import { useSimulation } from '@/context/SimulationContext';

interface ContinueButtonProps {
    label?: string;
    disabled?: boolean;
}

export default function ContinueButton({ label = 'Continue', disabled = false }: ContinueButtonProps) {
    const { nextScene, currentScene } = useSimulation();

    if (currentScene === 7) {
        return (
            <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl
          shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                🔄 Start Over
            </button>
        );
    }

    return (
        <button
            onClick={nextScene}
            disabled={disabled}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl
        shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        flex items-center gap-3"
        >
            {label}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
        </button>
    );
}
