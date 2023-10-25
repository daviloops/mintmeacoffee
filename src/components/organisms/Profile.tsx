import { Suspense, lazy } from 'react';

import { VStack, Box } from '@chakra-ui/react';
import MintCoffeeButton from '@/components/molecules/MintCoffeeButton';
import ProfileData from "@/components/organisms/ProfileData";

const Profile = ({ profileId }: { profileId: string }) => {
  return (
    <VStack gap={4}>
      <ProfileData profileId={profileId} />
      <MintCoffeeButton profileId={profileId} />
    </VStack>
  );
};

export default Profile;
