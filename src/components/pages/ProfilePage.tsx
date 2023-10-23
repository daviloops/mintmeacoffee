import { FC } from 'react';

import { Box } from '@chakra-ui/react';
import Profile from '@/components/Profile';
import ProfileTabs from '@/components/ProfileTabs';

interface pageProps {
  profileId: string
}

const ProfilePage: FC<pageProps> = ({ profileId }) => {
  return (
    <main>
      <Box p={4}>
        <Profile profileId={profileId} />
      </Box>
      
      <ProfileTabs profileId={profileId}  />
    </main>
  );
}

export default ProfilePage;