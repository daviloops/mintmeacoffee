import { FC } from 'react';

import { Box } from '@chakra-ui/react';
import Profile from '@/components/organisms/Profile';
import ProfileTabs from '@/components/organisms/ProfileTabs';

interface pageProps {
  profileId: string
}

const ProfilePage: FC<pageProps> = ({ profileId }) => {
  return (
    <main>
      <Box px={4} pb={2} pt={{ base: 8, sm: 1 }}>
        <Profile profileId={profileId} />
      </Box>
      
      <ProfileTabs profileId={profileId}  />
    </main>
  );
}

export default ProfilePage;