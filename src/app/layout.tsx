import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'SHRITEJ AYURVEDA | Ancient Wisdom • Natural Living • Responsible Future',
  description: 'Authentic Ayurvedic products inspired by traditional Indian wisdom, natural ingredients, and earth-conscious biodegradable packaging.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Eczar:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#F9F6F0] text-[#2C2723] antialiased selection:bg-[#C9A24D]/30 selection:text-[#1F2D20]">
        {children}
      </body>
    </html>
  );
}
