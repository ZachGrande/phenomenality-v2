import React from 'react';
import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono as GeistMono,
  Playfair_Display as PlayfairDisplay,
  Source_Sans_3 as SourceSans3,
} from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.sass';

const geistSans = Geist({
  subsets: ['latin'],
});

const geistMono = GeistMono({
  subsets: ['latin'],
});

const playfairDisplay = PlayfairDisplay({
  subsets: ['latin'],
});

const sourceSans3 = SourceSans3({
  subsets: ['latin'],
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
    <html lang="en" className={`${geistSans.className} ${geistMono.className} ${playfairDisplay.className} ${sourceSans3.className}`}>
      <body>{children}</body>
    </html>
  );
}
