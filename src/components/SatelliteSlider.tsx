'use client';

import React, { useState } from 'react';
import { Sliders, Eye, Maximize2, ShieldCheck, AlertTriangle } from 'lucide-react';

interface SatelliteSliderProps {
  baselineImage?: string;
  currentImage?: string;
  baselineYear?: string;
  currentYear?: string;
  baselineCanopy?: number;
  currentCanopy?: number;
  canopyDelta?: number;
}

export const SatelliteSlider: React.FC<SatelliteSliderProps> = ({
  baselineImage = '/satellite_images/IMG1.jpg',
  currentImage = '/satellite_images/IMG6_annotated.jpeg',
  baselineYear = '2019 Baseline Pass',
  currentYear = '2024 Current Sweep',
  baselineCanopy = 94.2,
  currentCanopy = 61.8,
  canopyDelta = -32.4,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMove = (clientPositionX: number, rect: DOMRect) => {
    const x = clientPositionX - rect.left;
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <div className="space-y-4">
      {/* Header Info Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0A120E] border border-[#EAF3EE]/10 font-mono text-xs">
        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-1 rounded bg-[#142A1F] text-[#2FE8B0] font-bold border border-[#2FE8B0]/30">
            SATELLITE EVIDENCE COMPARISON
          </span>
          <span className="text-[#8FA79A]">DRAG SLIDER TO INSPECT CANOPY SHIFT</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-[10px] text-[#5C7268]">CALCULATED CANOPY DELTA</span>
            <p className={`font-bold ${canopyDelta < 0 ? 'text-[#E8894F]' : 'text-[#2FE8B0]'}`}>
              {baselineYear.split(' ')[0]}: {baselineCanopy}% | {currentYear.split(' ')[0]}: {currentCanopy}% | Change: {canopyDelta}%
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Image Comparison Container */}
      <div
        className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#2FE8B0]/30 select-none cursor-ew-resize shadow-2xl group"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Current / After Image (Full Base) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={currentImage}
            alt="Current Satellite Scan"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#0A120E]/90 border border-[#E8894F]/40 text-[#E8894F] font-mono text-xs font-bold backdrop-blur-md flex items-center space-x-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{currentYear} ({currentCanopy}% Cover)</span>
          </div>
        </div>

        {/* Baseline / Before Image (Clipped Overlay) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={baselineImage}
            alt="Baseline Satellite Scan"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#0A120E]/90 border border-[#2FE8B0]/40 text-[#2FE8B0] font-mono text-xs font-bold backdrop-blur-md flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{baselineYear} ({baselineCanopy}% Cover)</span>
          </div>
        </div>

        {/* Vertical Divider Line with Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#2FE8B0] shadow-[0_0_15px_#2FE8B0] cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0F1C15] border-2 border-[#2FE8B0] flex items-center justify-center text-[#2FE8B0] shadow-xl">
            <Sliders className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
