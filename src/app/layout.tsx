import React from 'react';

import clsx from 'clsx';
import {
  Playfair_Display as PlayfairDisplay,
  Source_Sans_3 as SourceSans3,
} from 'next/font/google';

import Navigation from './_components/Navigation';

import './globals.css';

import type { Metadata } from 'next';

const playfairDisplay = PlayfairDisplay({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

const sourceSans3 = SourceSans3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans-3',
});

export const metadata: Metadata = {
  title: 'Phenomenality',
  description: 'Strengthen your mentality',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(playfairDisplay.variable, sourceSans3.variable)}
    >
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
