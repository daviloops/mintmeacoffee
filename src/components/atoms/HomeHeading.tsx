import { Box, Heading } from '@chakra-ui/react';

const HomeHeading = () => 
  <Heading as='h1' fontSize="8xl" color='purple' sx={{ position: 'relative', lineHeight: '0.8' }}>
    Support people, <br></br> <Box as='span' color='grey' fontSize="6xl">mint them a coffee.</Box>
  </Heading>;

export default HomeHeading;
