import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import Header from '@/components/organisms/Header';
import Providers from './providers';
import '@near-wallet-selector/modal-ui/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mint me a coffee',
  description: 'dApp to support people by minting them nfts on near blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        {/* // Todo: change favicon to static image */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>☕</text></svg>" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
