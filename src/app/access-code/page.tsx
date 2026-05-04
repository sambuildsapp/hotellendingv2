'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccessCodePage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch('/api/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        // Successful verification will set the cookie via the API route
        router.push('/');
        router.refresh(); // Ensure middleware picks up the new cookie
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-md w-full animate-fade-in">
        {/* Logo/Icon Area */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/20">
            <span className="text-4xl">🏨</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Private Demo Access</h1>
          <p className="text-blue-200/60 text-sm">Please enter your access code to view the AI-Augmented Lending simulation.</p>
        </div>

        {/* Input Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="access-code" className="block text-xs font-medium text-blue-200/60 uppercase tracking-widest mb-2 px-1">
                Access Code
              </label>
              <input
                id="access-code"
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-slate-950/50 border ${error ? 'border-red-500/50 shake' : 'border-white/10'} text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-white/10`}
                disabled={isLoading}
                required
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 px-1 animate-pulse">
                  Invalid access code. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !code}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/50 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Unlock Demo
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center mt-8 text-blue-200/30 text-xs">
          Confidential POC • AI Lending Intelligence System
        </p>
      </div>

      <style jsx>{`
        .shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
