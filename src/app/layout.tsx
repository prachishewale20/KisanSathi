import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KisanSaathi | किसान साथी - Grow Smart, Harvest Right, Sell Fair',
  description: 'Full crop season companion for small farmers: crop stage timeline, AI symptom helper, yield and income estimate, price trends, and sell listing board.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2F6B4F',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-cream text-charcoal flex justify-center antialiased">
        <div className="w-full max-w-[960px] min-h-screen flex flex-col bg-cream relative shadow-sm border-x border-[#EDE8DC]">
          {children}
        </div>
      </body>
    </html>
  );
}
