'use client';

import { useWallet } from '@mintbase-js/react';
import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const { isConnected, connect, disconnect } = useWallet();

  return (
    <Box as="nav" px={4} py={1} sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          as="button"
          sx={{ fontSize: ['32px','32px', '40px', '40px'] }}
          _hover={{ transform: 'scale(1.02)', opacity: '0.9', cursor: 'pointer' }}
          _active={{ transform: 'scale(0.98)' }}
          _expanded={{ transform: 'scale(1)' }}
          onClick={() => router.push('/')}
        >
          ☕
        </Box>
      </Box>
      <Button size={['sm', 'sm', 'md', 'md']} colorScheme={isConnected ? 'teal' : 'teal'} variant={isConnected ? "outline" : undefined} onClick={isConnected ? disconnect : connect}>
        {isConnected ? 'Sign out' : 'Connect wallet'}
      </Button>
    </Box>
  );
}

export default Header;