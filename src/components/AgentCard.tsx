'use client';

import { ReactNode } from 'react';

interface AgentCardProps {
    name: string;
    icon: string;
    status: 'idle' | 'working' | 'complete';
    description?: string;
    children?: ReactNode;
}

export default function AgentCard({ name, icon, status, description, children }: AgentCardProps) {
    const statusColors = {
        idle: 'bg-gray-100 border-gray-200',
        working: 'bg-blue-50 border-blue-300',
        complete: 'bg-green-50 border-green-300',
    };

    const statusBadge = {
        idle: { text: 'Idle', color: 'bg-gray-200 text-gray-600' },
        working: { text: 'Working...', color: 'bg-blue-500 text-white' },
        complete: { text: 'Complete', color: 'bg-green-500 text-white' },
    };

    return (
        <div className={`rounded-xl border-2 p-6 transition-all duration-500 ${statusColors[status]}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className={`text-4xl ${status === 'working' ? 'animate-bounce' : ''}`}>
                        {icon}
                    </span>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                        {description && (
                            <p className="text-sm text-gray-500">{description}</p>
                        )}
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge[status].color}`}>
                    {status === 'working' && (
                        <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    )}
                    {statusBadge[status].text}
                </span>
            </div>
            {children && (
                <div className="mt-4">
                    {children}
                </div>
            )}
        </div>
    );
}
