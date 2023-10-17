'use client';

import { WalletContextProvider } from '@mintbase-js/react';
import { MINTBASE_CONTRACTS, mbjs } from '@mintbase-js/sdk';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js'
import { CONFIG, network, coffeeNftContractId } from '@/config/constants';
import React from 'react';


export default function Providers({ children }: { children: React.ReactNode}) {
  mbjs.config({ network, contractAddress: MINTBASE_CONTRACTS[network] });

  return (
    <WalletContextProvider network={network} contractAddress={coffeeNftContractId}>
      <CacheProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </CacheProvider>
    </WalletContextProvider>
  );
}