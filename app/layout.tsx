import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BHASHA-MEDIA AI - Multilingual Script & Voice Content',
  description: 'Generate multilingual scripts and voice content for Indian creators using AI',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BHASHA-MEDIA AI',
  },
  openGraph: {
    title: 'BHASHA-MEDIA AI',
    description: 'Create multilingual scripts and voice content with AI',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FF9933' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
