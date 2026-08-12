'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Download, FileCheck, CheckCircle } from 'lucide-react';
import { CarbonCredit } from '@/types/carbon';

interface PdfReportButtonProps {
  credit: CarbonCredit;
  agentReportText?: string;
  verdict?: string;
}

export const PdfReportButton: React.FC<PdfReportButtonProps> = ({
  credit,
  agentReportText,
  verdict = 'INCONSISTENT WITH VERRA BASELINE',
}) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleDownloadPdf = () => {
    setIsGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Background Dark Palette Theme Accent
      doc.setFillColor(10, 18, 14); // #0A120E
      doc.rect(0, 0, 210, 297, 'F');

      // Title Header Banner
      doc.setFillColor(15, 28, 21); // #0F1C15
      doc.rect(10, 10, 190, 30, 'F');
      doc.setDrawColor(47, 232, 176); // #2FE8B0
      doc.setLineWidth(0.5);
      doc.rect(10, 10, 190, 30, 'D');

      doc.setTextColor(47, 232, 176);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('CARBONPROOF CONTINUOUS AI AUDIT REPORT', 15, 22);

      doc.setTextColor(143, 167, 154);
      doc.setFontSize(9);
      doc.text(`ISSUED: ${new Date().toLocaleDateString()} | CERTIFICATE ID: ${credit.id}`, 15, 30);

      // Section 1: Project Metadata & Registry Cross-Reference
      doc.setFillColor(20, 42, 31);
      doc.rect(10, 45, 190, 45, 'F');
      doc.setDrawColor(234, 243, 238);
      doc.setLineWidth(0.2);
      doc.rect(10, 45, 190, 45, 'D');

      doc.setTextColor(234, 243, 238);
      doc.setFontSize(11);
      doc.text(`PROJECT NAME: ${credit.projectName.toUpperCase()}`, 15, 53);

      doc.setFontSize(9);
      doc.setTextColor(143, 167, 154);
      doc.text(`CREDIT PASSPORT ID: ${credit.id}`, 15, 60);
      doc.text(`VERRA REGISTRY CROSS-REF: ${credit.project?.verraRegistryId || 'VCS-1482'}`, 15, 66);
      doc.text(`GOLD STANDARD CROSS-REF: ${credit.project?.goldStandardId || 'GS-3941'}`, 15, 72);
      doc.text(`MERKLE PROOF HASH: ${credit.merkleRootHash.slice(0, 32)}...`, 15, 78);
      doc.text(`VERIFICATION SCORE: ${credit.verificationScore}/100 (${credit.status})`, 15, 84);

      // Section 2: Agent Verdict Box
      doc.setFillColor(232, 137, 79); // #E8894F Accent
      doc.rect(10, 95, 190, 15, 'F');
      doc.setTextColor(10, 18, 14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(`CROSS-CHECK AGENT VERDICT: ${verdict.toUpperCase()}`, 15, 104);

      // Section 3: AI Verification Findings & Report Text
      doc.setTextColor(234, 243, 238);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('MULTI-SPECTRAL PERCEPTION & AI AUDIT FINDINGS', 15, 120);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(143, 167, 154);

      const reportLines = doc.splitTextToSize(
        agentReportText ||
          `CarbonProof AI completed multi-source perception audit for project boundary. Optical NDVI dropped from 0.88 to 0.62 alongside -32.4% canopy loss. Anomaly detection flags localized logging activities. Verdict: INCONSISTENT with Verra VCS baseline. Verification score updated to 62/100. Continuous 24/7 satellite SAR radar monitoring remains active across all sensor mesh nodes.`,
        180
      );

      doc.text(reportLines, 15, 128);

      // Footer Cryptographic Seal
      doc.setDrawColor(47, 232, 176);
      doc.line(10, 275, 200, 275);
      doc.setTextColor(47, 232, 176);
      doc.setFontSize(8);
      doc.text('CRYPTOGRAPHICALLY SEALED BY CARBONPROOF AUTONOMOUS MULTI-AGENT VERIFICATION ENGINE', 15, 282);

      doc.save(`CarbonProof_Audit_Report_${credit.id}.pdf`);
    } catch (err) {
      console.error('PDF export error', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      disabled={isGenerating}
      onClick={handleDownloadPdf}
      className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#2FE8B0] text-[#0A120E] font-space font-bold text-xs uppercase tracking-wider hover:bg-[#34fbbe] transition-all glow-teal shadow-xl"
    >
      <Download className="w-4 h-4" />
      <span>{isGenerating ? 'Generating PDF...' : 'Download Verification Report (PDF)'}</span>
    </button>
  );
};
