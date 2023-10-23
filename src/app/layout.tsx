import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/Header';
import Splash from '@/components/Splash';
import Providers from './providers';
import '@near-wallet-selector/modal-ui/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mint me a coffee',
  description: 'dApp to support people by minting them nfts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
