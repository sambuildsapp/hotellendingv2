'use client';

import { ReactNode } from 'react';
import { useSimulation } from '@/context/SimulationContext';

interface AnnotatedWidgetProps {
    id: string;
    title: string;
    annotation: string;
    children: ReactNode;
}

export default function AnnotatedWidget({ id, title, annotation, children }: AnnotatedWidgetProps) {
    const { showAllAnnotations } = useSimulation();

    return (
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <div className="relative">
                    <span className="text-lg cursor-help animate-pulse hover:animate-none" title="AI-Powered">
                        ✨
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {children}
            </div>

            {/* Annotation Overlay */}
            <div
                className={`absolute inset-0 bg-blue-900/95 p-4 transition-all duration-300 flex flex-col justify-center
          ${showAllAnnotations ? 'opacity-100' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'}
        `}
            >
                <div className="text-center">
                    <span className="text-3xl mb-3 block">🤖</span>
                    <p className="text-white text-sm leading-relaxed">{annotation}</p>
                </div>
            </div>
        </div>
    );
}
