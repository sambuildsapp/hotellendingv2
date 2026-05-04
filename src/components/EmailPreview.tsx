'use client';

interface EmailPreviewProps {
    from: string;
    to: string;
    subject: string;
    body: string;
    timestamp: string;
    attachments?: string[];
    isTyping?: boolean;
}

export default function EmailPreview({
    from,
    to,
    subject,
    body,
    timestamp,
    attachments,
    isTyping = false
}: EmailPreviewProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Email Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{subject}</h4>
                    <span className="text-sm text-gray-500">{timestamp}</span>
                </div>
                <div className="space-y-1 text-sm">
                    <div className="flex">
                        <span className="text-gray-500 w-16">From:</span>
                        <span className="text-gray-700">{from}</span>
                    </div>
                    <div className="flex">
                        <span className="text-gray-500 w-16">To:</span>
                        <span className="text-gray-700">{to}</span>
                    </div>
                </div>
            </div>

            {/* Email Body */}
            <div className="p-4">
                <div className={`whitespace-pre-wrap text-gray-700 ${isTyping ? 'animate-pulse' : ''}`}>
                    {body}
                </div>

                {/* Attachments */}
                {attachments && attachments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500 mb-2">Attachments ({attachments.length})</p>
                        <div className="flex flex-wrap gap-2">
                            {attachments.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200"
                                >
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                    <span className="text-sm text-blue-700">{file}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
