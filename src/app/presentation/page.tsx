'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-blue-200">
      {/* Header / Nav */}
      <div className="w-full p-6 flex justify-between items-center fixed top-0 z-10">
        <div className="font-semibold text-slate-400 tracking-widest uppercase text-xs">
          HotelLending AI OS
        </div>
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Slide Container */}
      <div className="flex-1 flex items-center justify-center p-8 mt-12 mb-20 overflow-hidden relative">
        
        {/* Slide 1: Business Context */}
        <div className={`absolute w-full max-w-6xl transition-all duration-700 ease-in-out ${currentSlide === 0 ? 'opacity-100 translate-x-0' : currentSlide < 0 ? 'opacity-0 translate-x-full' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium tracking-wide">
                The Core Problem
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
                The Processing <br/><span className="text-blue-600">Bottleneck</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                U.S. lenders manage <strong className="text-slate-900">tens of billions in hotel debt</strong> using a chaotic mix of emails, PDFs, and Excel. 
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Because of manual data entry and auditing, it takes weeks to parse performance reports once received. A performing asset can drift into distress, or a healthy one can be severely misinterpreted due to messy reporting, while its data sits in a processing queue.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-8">
              <h3 className="text-2xl font-semibold text-slate-800 border-b pb-4">Why a Team of Smart Agents is the Answer</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xl">⏳</div>
                  <div>
                    <h4 className="font-semibold text-lg">Time to Insight</h4>
                    <p className="text-slate-500">Reduce time-to-insight from weeks to &lt; 24 hours post-submission.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 text-xl">📈</div>
                  <div>
                    <h4 className="font-semibold text-lg">Analyst Capacity</h4>
                    <p className="text-slate-500">10x portfolio coverage per analyst. Move humans from data entry to exception handling.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xl">🧠</div>
                  <div>
                    <h4 className="font-semibold text-lg">Decision Readiness</h4>
                    <p className="text-slate-500">90% of loans are fully decision-ready overnight, leaving analysts to apply intuition only to flagged exceptions.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide 2: Hybrid Architecture Pipeline */}
        <div className={`absolute w-full max-w-6xl transition-all duration-700 ease-in-out ${currentSlide === 1 ? 'opacity-100 translate-x-0' : currentSlide < 1 ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium tracking-wide mb-4">
                Architecture & Demo
            </div>
            <h2 className="text-5xl font-bold text-slate-900">The Hybrid Agentic Architecture</h2>
            <p className="text-xl text-slate-500 mt-4 max-w-2xl mx-auto">Bridging the gap between traditional automation and agentic reasoning. A team of agents dynamically call tools, score confidence, and route complex exceptions to their human partners.</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-slate-100 text-center relative group hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">1</div>
                <h4 className="font-bold text-lg mb-1">The Trigger</h4>
                <p className="text-sm text-slate-500">Month-end hits. The automation sequence begins.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100 text-center relative group hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">2</div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Collection Agent</div>
                <h4 className="font-bold text-lg mb-1">The Chase</h4>
                <p className="text-sm text-slate-500">Autonomous outreach to borrowers for PDFs/Excel.</p>
                <div className="mt-3 inline-block px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-mono">[Tool: Email API]</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100 text-center relative group hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">3</div>
                <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Standardization Agent</div>
                <h4 className="font-bold text-lg mb-1">The Brain</h4>
                <p className="text-sm text-slate-500">Maps chaotic unstructured data into USALI standards.</p>
                <div className="mt-3 inline-block px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-mono">[Logic: LLM Mapping]</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-emerald-100 text-center relative group hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">4</div>
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Verification Agent</div>
                <h4 className="font-bold text-lg mb-1">The Auditor</h4>
                <p className="text-sm text-slate-500">Cross-references mapped P&L against bank feeds.</p>
                <div className="mt-3 inline-block px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-mono">[Tool: Bank API]</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-rose-100 text-center relative group hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">5</div>
                <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">Compliance Agent</div>
                <h4 className="font-bold text-lg mb-1">The Watchdog</h4>
                <p className="text-sm text-slate-500">Checks verified numbers against loan covenants.</p>
                <div className="mt-3 inline-block px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-mono">[Tool: Read Loan Doc]</div>
              </div>

            </div>
            
            {/* Exception Routing Layer */}
            <div className="mt-8 border-t-2 border-dashed border-yellow-200 pt-6 relative z-10 flex justify-center">
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                 Exception Routing Layer
               </div>
               <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-yellow-200 text-center max-w-2xl shadow-sm">
                 <p className="text-sm text-slate-600">
                   If an agent returns a <strong>Confidence Score &lt; 95%</strong> on any line item, the workflow dynamically pauses and escalates the context to a human analyst.
                 </p>
               </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Link 
              href="/v2" 
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-slate-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1"
            >
              Launch Live Demo
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>

        </div>
      </div>

      {/* Footer Controls */}
      <div className="fixed bottom-0 w-full p-6 flex justify-between items-center bg-white/50 backdrop-blur-md border-t border-slate-200/50 z-10">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentSlide === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Previous
        </button>
        
        <div className="text-sm font-medium text-slate-400">
          Slide {currentSlide + 1} of {totalSlides}
        </div>

        <button 
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentSlide === totalSlides - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
        >
          Next
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  );
}
