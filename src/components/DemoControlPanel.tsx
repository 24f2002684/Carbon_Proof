'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Zap, AlertTriangle, ShieldCheck, X, Sparkles } from 'lucide-react';

interface DemoControlPanelProps {
  onTriggerEvent: () => void;
}

export const DemoControlPanel: React.FC<DemoControlPanelProps> = ({ onTriggerEvent }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTriggering, setIsTriggering] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFireDemoTrigger = async (projectId: string) => {
    setIsTriggering(true);
    setStatusMessage(`Triggering live scan anomaly for ${projectId}...`);

    try {
      const res = await fetch('/api/demo/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      const data = await res.json();
      setStatusMessage(data.message || 'Event fired!');
      setIsTriggering(false);
      onTriggerEvent();
    } catch (err) {
      setStatusMessage('Trigger failed');
      setIsTriggering(false);
    }
  };

  return (
    <>
      {/* Floating Pitch Demo Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/50 font-mono text-xs shadow-2xl hover:bg-[#1B7A5C] transition-all glow-teal-sm"
      >
        <Radio className="w-4 h-4 animate-pulse text-[#2FE8B0]" />
        <span>PITCH DEMO MODE (Ctrl+Shift+D)</span>
      </button>

      {/* Control Panel Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A120E]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-[#0F1C15] border border-[#2FE8B0]/40 space-y-6 shadow-2xl relative glow-teal">
            <div className="flex items-center justify-between border-b border-[#EAF3EE]/10 pb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#2FE8B0]" />
                <h3 className="font-space font-bold text-lg text-[#EAF3EE]">
                  Live Pitch Anomaly Trigger Panel
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-[#8FA79A] hover:text-[#EAF3EE]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#8FA79A] leading-relaxed">
              Use this panel during the hackathon presentation to trigger live anomaly events on demand so judges watch real-time status shifts happen on screen.
            </p>

            <div className="space-y-3">
              <button
                disabled={isTriggering}
                onClick={() => handleFireDemoTrigger('CP-AMZ-8841')}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#0A120E] border border-[#E8894F]/40 text-[#EAF3EE] hover:bg-[#142A1F] transition-all text-xs font-mono"
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-[#E8894F]" />
                  <div className="text-left">
                    <p className="font-bold text-[#E8894F]">Trigger Alto Mayo Anomaly</p>
                    <p className="text-[10px] text-[#8FA79A]">Drops score 96 → 62 & fires live alert</p>
                  </div>
                </div>
                <Zap className="w-4 h-4 text-[#E8894F]" />
              </button>

              <button
                disabled={isTriggering}
                onClick={() => handleFireDemoTrigger('CP-KTG-7712')}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#0A120E] border border-[#2FE8B0]/40 text-[#EAF3EE] hover:bg-[#142A1F] transition-all text-xs font-mono"
              >
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-[#2FE8B0]" />
                  <div className="text-left">
                    <p className="font-bold text-[#2FE8B0]">Trigger Katingan Re-Verify</p>
                    <p className="text-[10px] text-[#8FA79A]">Restores score 97/100 & seals Merkle proof</p>
                  </div>
                </div>
                <Zap className="w-4 h-4 text-[#2FE8B0]" />
              </button>
            </div>

            {statusMessage && (
              <div className="p-3 rounded-xl bg-[#0A120E] border border-[#2FE8B0]/20 font-mono text-xs text-[#2FE8B0]">
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
