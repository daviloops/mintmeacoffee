import { Stack } from '@chakra-ui/react';

import DonateInput from '@/components/molecules/DonateInput';
import HomeHeading from '@/components/atoms/HomeHeading';

const Welcome = () => {
  return (
    <Stack spacing={8}>
      <HomeHeading />
      <DonateInput />
    </Stack>
  );
};

export default Welcome;
