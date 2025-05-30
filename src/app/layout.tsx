import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { Inter, Roboto_Mono } from 'next/font/google';
import Providers from '@/components/Providers';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TravelMate',
  description: 'Collaborative travel planning made easy.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
