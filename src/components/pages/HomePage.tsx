import { FC } from 'react';

import { Box, Heading } from '@chakra-ui/react';

import DonateInput from '@/components/DonateInput';
import NftFeedViewAll from '@/components/NftFeedViewAll';

const HomePage: FC = () => {
  
  return (
    <main>
      <Box p={4}>
        <Heading as='h1' fontSize="8xl" color='purple' sx={{ position: 'relative', lineHeight: '0.8' }}>
          Support people, <br></br> <Box as='span' color='grey' fontSize="6xl">mint them a coffee.</Box>
        </Heading>
      </Box>
      <Box p={4}>
        <DonateInput />
      </Box>
      <Box p={4}>
        <NftFeedViewAll />
      </Box>
    </main>
  );
}

export default HomePage;
