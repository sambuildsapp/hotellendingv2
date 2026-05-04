import React, { useEffect } from 'react';

interface SimulationControlBarProps {
    onNext: () => void;
    onPrev: () => void;
    onReset: () => void;
    onFinish?: () => void;
    onBack?: () => void;
    currentStep: number;
    totalSteps: number;
    isAnimating?: boolean;
    finishLabel?: string;
}

export default function SimulationControlBar({
    onNext,
    onPrev,
    onReset,
    onFinish,
    onBack,
    currentStep,
    totalSteps,
    finishLabel = "Next Scene",
    isAnimating = false
}: SimulationControlBarProps) {

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isAnimating) return; // Block input during animation

            switch (e.key) {
                case 'ArrowRight':
                case ' ': // Spacebar
                    if (currentStep >= totalSteps && onFinish) {
                        onFinish();
                    } else {
                        onNext();
                    }
                    break;
                case 'ArrowLeft':
                    if (currentStep === 0 && onBack) {
                        onBack();
                    } else {
                        onPrev();
                    }
                    break;
                case 'r':
                case 'R':
                    onReset();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onNext, onPrev, onReset, isAnimating]);

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-slate-900/90 backdrop-blur-md text-white p-2 rounded-full shadow-2xl border border-slate-700 flex items-center gap-2 transition-all hover:scale-105">

                {/* Previous / Back */}
                <button
                    onClick={currentStep === 0 && onBack ? onBack : onPrev}
                    disabled={(currentStep === 0 && !onBack) || isAnimating}
                    className={`
                        p-3 rounded-full transition-colors 
                        ${currentStep === 0 && onBack
                            ? 'hover:bg-slate-700 text-slate-300 hover:text-white'
                            : 'hover:bg-slate-700'}
                        disabled:opacity-30 disabled:hover:bg-transparent
                    `}
                    title={currentStep === 0 ? "Previous Scene" : "Previous Step (Left Arrow)"}
                >
                    {currentStep === 0 && onBack ? (
                        <span className="text-xl">⏮</span>
                    ) : (
                        <span className="text-xl">←</span>
                    )}
                </button>

                {/* Progress Indicator */}
                <div className="px-4 flex flex-col items-center min-w-[100px]">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Step
                    </span>
                    <span className="text-lg font-bold font-mono">
                        {currentStep} <span className="text-slate-500">/</span> {totalSteps}
                    </span>
                </div>

                {/* Next / Play / Finish */}
                <button
                    onClick={currentStep >= totalSteps && onFinish ? onFinish : onNext}
                    disabled={(currentStep >= totalSteps && !onFinish) || isAnimating}
                    className={`
                        p-3 rounded-full transition-all flex items-center gap-2 px-6
                        ${currentStep >= totalSteps
                            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                            : 'bg-blue-600 hover:bg-blue-700'}
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    title={currentStep >= totalSteps ? finishLabel : "Next Step (Right Arrow or Space)"}
                >
                    {isAnimating ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="text-sm font-semibold">Running...</span>
                        </>
                    ) : currentStep >= totalSteps ? (
                        <>
                            <span className="text-sm font-semibold">{finishLabel}</span>
                            <span className="text-xl">⏭</span>
                        </>
                    ) : (
                        <>
                            <span className="text-sm font-semibold">Next</span>
                            <span className="text-xl">→</span>
                        </>
                    )}
                </button>

                <div className="w-px h-8 bg-slate-700 mx-2" />

                {/* Reset */}
                <button
                    onClick={onReset}
                    disabled={isAnimating}
                    className="p-3 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Replay Scene (R)"
                >
                    <span className="text-xl">↺</span>
                </button>
            </div>

            {/* Keyboard Hint */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] text-slate-400 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                Use Arrow Keys to Navigate • R to Replay
            </div>
        </div>
    );
}
