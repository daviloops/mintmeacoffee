'use client';

import { useEffect, useState } from 'react';

import { 
  Box,
  Avatar,
  Text,
  VStack,
  HStack,
  Link,
  Tag,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import useSocialDB from '@/hooks/useSocialDB';
import useNftContract from '@/hooks/useNftContract';

import { ipfsUrl, CONFIG, coffeeNftContractId } from '@/config/constants';
import { appendPath } from '@/utils';
import { wrap } from 'module';

interface ProfileData {
  image?: {
    ipfs_cid?: string,
    url?: string,
    nft?: {
      contractId?: string,
      tokenId?: string,
    },
  },
  backgroundImage?: {
    ipfs_cid?: string,
    url?: string,
    nft?: {
      contractId?: string,
      tokenId?: string,
    },
  },
  description?: string,
  linktree?: {
    github?: string,
    telegram?: string,
    twitter?: string,
    website?: string,
  },
  name?: string,
  tags?: Object,
}

export const Loading = () =>
  <VStack gap={2}>
    <SkeletonCircle size={{ base: "60px", sm: "100px" }} />
    <SkeletonText noOfLines={1} skeletonHeight={6} w={["200px", "240px", "240px", "240px"]} />
    <SkeletonText noOfLines={1} skeletonHeight={4} w={["250px", "420px","700px", "700px"]} />
    <SkeletonText noOfLines={1} skeletonHeight={4} w={["250px", "420px","700px", "700px"]} />
    <SkeletonText noOfLines={1} skeletonHeight={4} w={["180px", "300px","500px", "500px"]} />
    <SkeletonText noOfLines={1} skeletonHeight={4} w={["120px", "250px","300px", "300px"]} />
    <SkeletonText noOfLines={1} skeletonHeight={4} w={["190px", "330px","400px", "400px"]} />
  </VStack>;

const ProfileData = ({ profileId }: { profileId: string }) => {
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const { getProfileData } = useSocialDB({ accountId: coffeeNftContractId });
  const { getNftMetadata, getNftToken } = useNftContract({ accountId: coffeeNftContractId });
  
  useEffect(() => {
    getProfileData(profileId)
      .then(data => {
        console.log({data})
        setProfileData(data?.[`${profileId}`]?.profile);
        getProfileImageUrl(data?.[`${profileId}`]?.profile)
          .then(url => {
            if (url) {
              setProfileImageUrl(url);
            }
          });
      })
      .finally(() => setLoading(false));
  }, []);
  
  const getProfileImageUrl = async (data: ProfileData) => {
    if (data?.image) {
      if (data.image.ipfs_cid) {
        return ipfsUrl + data.image.ipfs_cid;
      } else if (data.image.url) {
        return data.image.url;
      } else if (data.image.nft && data.image.nft.contractId && data.image.nft.tokenId) {
        const metadata = await getNftMetadata(data.image.nft.contractId);
        if (metadata.base_uri) {
          const nft = await getNftToken(data.image.nft.contractId, data.image.nft.tokenId);
          if (nft.metadata.media) {
            return appendPath(metadata.base_uri, nft.metadata.media);
          }
        }
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack gap={2}>
      <Avatar size={{ base: "lg", sm: "xl" }} src={profileImageUrl} />
      {profileData?.name ? (
        <VStack spacing={0}>
          <Text fontSize={{ base: "2xl", sm: "3xl" }}>{profileData.name}</Text>
          <Link
            fontSize={{ base: "md", sm: "lg" }}
            sx={{ '&:hover': {color: 'teal'} }}
            href={CONFIG.bosProfilePageUrl + profileId}
            isExternal
          >
            {profileId}
          </Link>
        </VStack>
      ) : (
        <>
        <Link
          fontSize="3xl"
          sx={{ '&:hover': {color: 'teal'} }}
          href={CONFIG.bosProfilePageUrl + profileId}
          isExternal
        >
          {profileId}
        </Link>
        </>
      )}
      {profileData?.description && (
        <Box fontSize={{ base: "sm", sm: "md" }} sx={{ maxWidth: "700px", textAlign: "center" }}>
          <Text as="i">{profileData.description}</Text>
        </Box>
      )}
      {profileData?.tags && (
        <HStack spacing={2} wrap="wrap" justify="center">
          {Object.keys(profileData.tags)?.map(tag => (
            <Tag fontSize={{ base: "xs", sm: "sm"  }} size={{ base: "sm", sm: "md" }}>{tag}</Tag>
          ))}
        </HStack>
      )}
      {profileData?.linktree && (
        <HStack spacing={2} wrap="wrap" justify="center">
          {profileData.linktree.website && (
            <Link fontSize={{ base: "xs", sm: "sm" }} href={`https://${profileData.linktree.website}`} isExternal>
              <HStack spacing={1}>
                <i className="bi bi-globe"></i>
                <Text>{profileData.linktree.website}</Text>
              </HStack>
            </Link>
          )}
          {profileData.linktree.github && (
            <Link fontSize={{ base: "xs", sm: "sm" }} href={`https://github.com/${profileData.linktree.github}`} isExternal>
              <HStack spacing={1}>
                <i className="bi bi-github"></i>
                <Text>{profileData.linktree.github}</Text>
              </HStack>
            </Link>
          )}
          {profileData.linktree.twitter && (
            <Link fontSize={{ base: "xs", sm: "sm" }} href={`https://twitter.com/${profileData.linktree.twitter}`} isExternal>
              <HStack spacing={1}>
                <i className="bi bi-twitter-x"></i>
                <Text>{profileData.linktree.twitter}</Text>
              </HStack>
            </Link>
          )}
          {profileData.linktree.telegram && (
            <Link fontSize={{ base: "xs", sm: "sm" }} href={`https://t.me/${profileData.linktree.telegram}`} isExternal>
              <HStack spacing={1}>
                <i className="bi bi-telegram"></i>
                <Text>{profileData.linktree.telegram}</Text>
              </HStack>
            </Link>
          )}
        </HStack>
      )} 
    </VStack>
  );
};

export default ProfileData;
