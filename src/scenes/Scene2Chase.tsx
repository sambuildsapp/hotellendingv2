'use client';

import { useState, useEffect } from 'react';
import SceneHeader from '@/components/SceneHeader';
import AgentCard from '@/components/AgentCard';
import EmailPreview from '@/components/EmailPreview';
import ContinueButton from '@/components/ContinueButton';
import { emailTemplates } from '@/data/simulationData';

export default function Scene2Chase() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 1000),  // Day 3: No response
            setTimeout(() => setStage(2), 2500),  // Follow-up sent
            setTimeout(() => setStage(3), 4500),  // Day 4: Borrower replies
            setTimeout(() => setStage(4), 6500),  // Thank you sent
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <SceneHeader
                title="The Chase"
                subtitle="Intelligent Follow-up & Data Ingestion"
                day="Day 3-4"
            />

            <div className="space-y-6">
                {/* Timeline */}
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <div className={`flex flex-col items-center ${stage >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                        <span className="text-2xl">📅</span>
                        <span className="text-sm font-medium">Day 3</span>
                        <span className="text-xs">No Response</span>
                    </div>
                    <div className={`flex-1 h-1 mx-4 ${stage >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                    <div className={`flex flex-col items-center ${stage >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className="text-2xl">📨</span>
                        <span className="text-sm font-medium">Day 4</span>
                        <span className="text-xs">Response Received</span>
                    </div>
                </div>

                {/* Agent Status */}
                <AgentCard
                    name="Collection Agent"
                    icon="📧"
                    status={stage === 0 ? 'idle' : stage < 4 ? 'working' : 'complete'}
                    description="Monitoring inbox and managing follow-ups"
                >
                    {stage >= 1 && stage < 3 && (
                        <div className="text-sm text-gray-600">
                            <p>⏰ No response after 3 days. Sending courteous follow-up...</p>
                        </div>
                    )}
                    {stage >= 3 && stage < 4 && (
                        <div className="text-sm text-gray-600">
                            <p>📥 Response received! Extracting attachments...</p>
                        </div>
                    )}
                    {stage >= 4 && (
                        <div className="text-sm text-gray-600">
                            <p>✅ Data ingested. Sending confirmation and forwarding to Standardization Agent.</p>
                        </div>
                    )}
                </AgentCard>

                {/* Follow-up Email */}
                {stage >= 2 && stage < 3 && (
                    <div className="animate-fade-in">
                        <p className="text-sm text-gray-500 mb-2">Follow-up email sent:</p>
                        <EmailPreview
                            from={emailTemplates.followUp.from}
                            to={emailTemplates.followUp.to}
                            subject={emailTemplates.followUp.subject}
                            body={emailTemplates.followUp.body}
                            timestamp={emailTemplates.followUp.timestamp}
                        />
                    </div>
                )}

                {/* Borrower Reply */}
                {stage >= 3 && (
                    <div className="animate-fade-in">
                        <p className="text-sm text-gray-500 mb-2">📬 Borrower replied:</p>
                        <EmailPreview
                            from={emailTemplates.borrowerReply.from}
                            to={emailTemplates.borrowerReply.to}
                            subject={emailTemplates.borrowerReply.subject}
                            body={emailTemplates.borrowerReply.body}
                            timestamp={emailTemplates.borrowerReply.timestamp}
                            attachments={emailTemplates.borrowerReply.attachments}
                        />
                    </div>
                )}

                {/* Thank You Email */}
                {stage >= 4 && (
                    <div className="animate-fade-in space-y-4">
                        <p className="text-sm text-gray-500 mb-2">✉️ Automatic acknowledgment:</p>
                        <EmailPreview
                            from={emailTemplates.thankYou.from}
                            to={emailTemplates.thankYou.to}
                            subject={emailTemplates.thankYou.subject}
                            body={emailTemplates.thankYou.body}
                            timestamp={emailTemplates.thankYou.timestamp}
                        />

                        {/* Key Insight */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">🎯</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Messy Data? No Problem.</h4>
                                    <p className="text-gray-600">
                                        The borrower sent their &quot;internal format&quot; Excel and a scanned PDF. Traditional workflows
                                        would require manual spreading. Let&apos;s see how the Standardization Agent handles this...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Continue Button */}
            <div className="mt-8 flex justify-center">
                <ContinueButton label="See How AI Reads the Data" disabled={stage < 4} />
            </div>
        </div>
    );
}
