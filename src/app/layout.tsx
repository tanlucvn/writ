import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/theme';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const APP_NAME = 'Minimil';
const APP_DEFAULT_TITLE = 'Minimil';
const APP_TITLE_TEMPLATE = '%s - Minimil';
const APP_DESCRIPTION =
  'A sleek and minimal Next.js starter template, optimized for performance and rapid development.';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icons/favicon-light.ico',
        href: '/icons/favicon-light.ico'
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icons/favicon.ico',
        href: '/icons/favicon.ico'
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  keywords: [
    'Next.js PWA',
    'Next.js 15 PWA Template',
    'Minimal PWA',
    'Tailwind CSS',
    'Serwist',
    'React',
    'Starter Template',
    'Offline Support',
    'Fast and Lightweight'
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <main className='mx-auto max-w-screen-sm px-6 py-24'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
