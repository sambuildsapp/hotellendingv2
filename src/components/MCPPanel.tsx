'use client';

import { useState } from 'react';
import { useSimulation } from '@/context/SimulationContext';

interface MCPPanelProps {
    id: string;
    tool: string;
    request: object;
    response: object;
    defaultExpanded?: boolean;
}

export default function MCPPanel({ id, tool, request, response, defaultExpanded = false }: MCPPanelProps) {
    const { expandedMCPPanels, toggleMCPPanel } = useSimulation();
    const isExpanded = expandedMCPPanels.has(id) || defaultExpanded;

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <button
                onClick={() => toggleMCPPanel(id)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="text-green-400 font-mono text-sm">MCP</span>
                    <span className="text-white font-mono">{tool}</span>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isExpanded && (
                <div className="p-4 space-y-4">
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">Request</p>
                        <pre className="text-green-300 text-sm overflow-x-auto p-3 bg-gray-950 rounded">
                            {JSON.stringify(request, null, 2)}
                        </pre>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">Response</p>
                        <pre className="text-blue-300 text-sm overflow-x-auto p-3 bg-gray-950 rounded">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}
