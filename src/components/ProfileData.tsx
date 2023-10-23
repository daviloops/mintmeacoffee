'use client';

import { 
  Box,
  Avatar,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react';


const ProfileData = ({ profileId }: { profileId: string }) => {
  return (
    <VStack gap={2}>
      <Avatar size="xl" />
      <Link
        fontSize="2xl"
        sx={{ '&:hover': {color: 'teal'} }}
        href={`https://test.near.org/discom.testnet/widget/ProfilePage?accountId=${profileId}`}
        isExternal
      >
        {profileId}
      </Link>
      <Box sx={{ maxWidth: "700px", textAlign: "center" }}>
        <Text as="i">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequatur culpa veniam cumque sint dignissimos necessitatibus
          quod labore eligendi veritatis. At quibusdam architecto eaque explicabo fugit, rerum iusto dignissimos ratione."
        </Text>
      </Box>
    </VStack>
  );
};

export default ProfileData;
