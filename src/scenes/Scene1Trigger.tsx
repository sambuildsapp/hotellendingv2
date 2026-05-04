'use client';

import { useState, useEffect } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AgentCard from '@/components/AgentCard';
import EmailPreview from '@/components/EmailPreview';
import MCPPanel from '@/components/MCPPanel';
import ContinueButton from '@/components/ContinueButton';
import { hotelData, emailTemplates, mcpCalls } from '@/data/simulationData';

export default function Scene1Trigger() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Auto-advance through stages
        const timers = [
            setTimeout(() => setStage(1), 1000),  // Agent wakes up
            setTimeout(() => setStage(2), 2500),  // Agent starts drafting
            setTimeout(() => setStage(3), 4000),  // Email composed
            setTimeout(() => setStage(4), 5500),  // Email sent
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <SceneHeader
                title="The Trigger"
                subtitle="Collection Agent Activates"
                day="Day 1 — February 5th, 9:00 AM"
            />

            <div className="space-y-6">
                {/* Calendar Trigger */}
                <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                    <span className="text-5xl">📅</span>
                    <div>
                        <p className="text-lg font-semibold text-gray-800">5th of the Month</p>
                        <p className="text-gray-600">Monthly collection cycle triggered automatically</p>
                    </div>
                </div>

                {/* Agent Card */}
                <AgentCard
                    name="Collection Agent"
                    icon="📧"
                    status={stage === 0 ? 'idle' : stage < 4 ? 'working' : 'complete'}
                    description="Proactively requests financial data from borrowers"
                >
                    {stage >= 1 && (
                        <div className="text-sm text-gray-600 animate-fade-in">
                            {stage === 1 && <p>🔍 Scanning portfolio for pending submissions...</p>}
                            {stage === 2 && <p>✏️ Drafting personalized email for {hotelData.controller.name}...</p>}
                            {stage === 3 && <p>📄 Email composed. Preparing to send...</p>}
                            {stage === 4 && <p>✅ Email sent successfully to {hotelData.controller.email}</p>}
                        </div>
                    )}
                </AgentCard>

                {/* Email Preview */}
                {stage >= 3 && (
                    <div className="animate-fade-in">
                        <EmailPreview
                            from={emailTemplates.initial.from}
                            to={emailTemplates.initial.to}
                            subject={emailTemplates.initial.subject}
                            body={emailTemplates.initial.body}
                            timestamp={emailTemplates.initial.timestamp}
                            isTyping={stage === 3}
                        />
                    </div>
                )}

                {/* MCP Panel */}
                {stage >= 4 && (
                    <div className="animate-fade-in">
                        <MCPPanel
                            id="scene1-send-email"
                            tool="send_email"
                            request={mcpCalls.sendEmail.request}
                            response={mcpCalls.sendEmail.response}
                        />
                    </div>
                )}

                {/* Key Point */}
                {stage >= 4 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 animate-fade-in">
                        <div className="flex items-start gap-4">
                            <span className="text-3xl">💡</span>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">No Human Intervention Required</h4>
                                <p className="text-gray-600">
                                    The Collection Agent automatically identified Hotel Downtown&apos;s pending January financials
                                    and sent a personalized request to {hotelData.controller.name}. All actions are logged for audit.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Continue Button */}
            <div className="mt-8 flex justify-center">
                <ContinueButton label="Continue to Day 3" disabled={stage < 4} />
            </div>
        </div>
    );
}
