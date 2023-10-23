import { VStack } from '@chakra-ui/react';
import MintCoffeeButton from '@/components/MintCoffeeButton';
import ProfileData from '@/components/ProfileData';

const Profile = ({ profileId }: { profileId: string }) => {
  return (
    <VStack gap={4}>
      <ProfileData profileId={profileId} />
      <MintCoffeeButton profileId={profileId} />
    </VStack>
  );
};

export default Profile;
