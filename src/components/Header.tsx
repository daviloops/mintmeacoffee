'use client';

import { useWallet } from '@mintbase-js/react';
import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const { isConnected, connect, disconnect } = useWallet();

  return (
    <Box as="nav" sx={{ minHeight: '70px', display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          as="button"
          sx={{ fontSize: '40px' }}
          _hover={{ transform: 'scale(1.02)', opacity: '0.9', cursor: 'pointer' }}
          _active={{ transform: 'scale(0.98)' }}
          _expanded={{ transform: 'scale(1)' }}
          onClick={() => router.push('/')}
        >
          ☕
        </Box>
      </Box>
      <Button colorScheme={isConnected ? 'teal' : 'teal'} variant={isConnected ? "outline" : undefined} onClick={isConnected ? disconnect : connect}>
        {isConnected ? 'Sign out' : 'Connect wallet'}
      </Button>
    </Box>
  );
}

export default Header;