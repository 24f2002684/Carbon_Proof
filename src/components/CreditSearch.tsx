'use client';

import React, { useState } from 'react';
import { Search, HelpCircle, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CreditSearchProps {
  onSelectProject: (projectId: string) => void;
}

export const CreditSearch: React.FC<CreditSearchProps> = ({ onSelectProject }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length > 1) {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/credits/search?q=${encodeURIComponent(val)}`);
        const data = await res.json();
        if (data.success) {
          setSuggestions(data.suggestions || []);
        }
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto space-y-2">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-[#2FE8B0]">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search by Credit ID (e.g. CP-2026-AMZ-09412), Project ID, or Region..."
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-[#0F1C15] border border-[#2FE8B0]/40 text-[#EAF3EE] font-space text-sm placeholder-[#5C7268] focus:outline-none focus:border-[#2FE8B0] shadow-2xl transition-all"
        />

        <button
          onClick={() => setShowTooltip(!showTooltip)}
          className="absolute right-4 text-[#8FA79A] hover:text-[#2FE8B0] transition-colors"
          title="What does this Credit ID schema mean?"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Credit ID Schema Tooltip Note */}
      {showTooltip && (
        <div className="p-4 rounded-2xl bg-[#0A120E] border border-[#2FE8B0]/40 font-mono text-xs text-[#EAF3EE] space-y-2 shadow-2xl animate-fade-in">
          <div className="flex items-center space-x-2 text-[#2FE8B0] font-bold">
            <Tag className="w-4 h-4" />
            <span>CARBONPROOF CREDIT ID SCHEMA BREAKDOWN</span>
          </div>
          <p className="text-[11px] text-[#8FA79A]">
            <span className="text-[#2FE8B0] font-bold">CP-2026-AMZ-09412</span> represents:
          </p>
          <ul className="space-y-1 text-[11px] text-[#8FA79A] list-disc list-inside pl-1">
            <li><span className="text-[#EAF3EE] font-bold">CP</span> — CarbonProof Global Registry Prefix</li>
            <li><span className="text-[#EAF3EE] font-bold">2026</span> — Verification Cycle / Vintage Issuance Year</li>
            <li><span className="text-[#EAF3EE] font-bold">AMZ</span> — Regional Code (AMZ = Amazon Basin, CGB = Congo Basin, SEA = SE Asia)</li>
            <li><span className="text-[#EAF3EE] font-bold">09412</span> — Unique Sequential Project Identifier</li>
          </ul>
        </div>
      )}

      {/* Auto-suggest Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 p-2 rounded-2xl bg-[#0F1C15] border border-[#2FE8B0]/40 space-y-1 shadow-2xl">
          {suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectProject(item.id);
                setQuery('');
                setSuggestions([]);
              }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-[#142A1F] cursor-pointer transition-all"
            >
              <div>
                <span className="px-2 py-0.5 rounded bg-[#0A120E] text-[#2FE8B0] font-mono text-[10px] font-bold border border-[#2FE8B0]/30 mr-2">
                  {item.creditId}
                </span>
                <span className="font-space font-bold text-xs text-[#EAF3EE]">{item.name}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8FA79A]" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
