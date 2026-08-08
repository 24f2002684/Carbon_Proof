import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CarbonProof | Continuous AI Carbon Credit Verification Platform',
  description: 'AI-powered continuous carbon credit verification platform fusing satellite imagery, drone SAR, and IoT sensors into live digital passports.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0A120E] text-[#EAF3EE] font-sans antialiased min-h-screen selection:bg-[#2FE8B0] selection:text-[#0A120E]">
        {children}
      </body>
    </html>
  );
}
