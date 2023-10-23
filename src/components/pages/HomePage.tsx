import { FC } from 'react';

import { Stack, Box } from '@chakra-ui/react';

import Welcome from '@/components/organisms/Welcome';
import NftFeedViewAll from '@/components/organisms/NftFeedViewAll';

const HomePage: FC = () => {
  
  return (
    <main>
      <Box p={4}>
        <Stack spacing={16}>
          <Welcome />
          <NftFeedViewAll />
        </Stack>
      </Box>
    </main>
  );
}

export default HomePage;
