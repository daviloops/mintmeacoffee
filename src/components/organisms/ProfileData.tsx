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
} from '@chakra-ui/react';
import useSocialDB from '@/hooks/useSocialDB';
import useNftContract from '@/hooks/useNftContract';

import { ipfsUrl, CONFIG, coffeeNftContractId } from '@/config/constants';

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

const ProfileData = ({ profileId }: { profileId: string }) => {
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');

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
    });
  }, []);

  const appendPath = (href: string, path: string) => {
    if (!path) { 
      return href;
    }
    const url = new URL(href);
    url.pathname += `${url.pathname.endsWith('/') ? "" : "/"}${path.startsWith('/') ? path.slice(1) : path}`
    return url.href;
  }
  
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
            return appendPath(metadata.base_uri, nft.metadata.media).toString();
          }
        }
      }
    }
  };

  return (
    <VStack gap={2}>
      <Avatar size="xl" src={profileImageUrl} />
      {profileData.name ? (
        <VStack spacing={0}>
          <Text fontSize="3xl">{profileData.name}</Text>
          <Link
            fontSize="md"
            sx={{ '&:hover': {color: 'teal'} }}
            href={CONFIG.bosProfilePageUrl + profileId}
            isExternal
          >
            {profileId}
          </Link>
        </VStack>
      ) : (
        <Link
          fontSize="3xl"
          sx={{ '&:hover': {color: 'teal'} }}
          href={CONFIG.bosProfilePageUrl + profileId}
          isExternal
        >
          {profileId}
        </Link>
      )}
      {profileData.description && (
        <Box sx={{ maxWidth: "700px", textAlign: "center" }}>
          <Text as="i">{profileData.description}</Text>
        </Box>
      )}
      {profileData.tags && (
        <HStack spacing={2}>
          {Object.keys(profileData.tags)?.map(tag => (
            <Tag>{tag}</Tag>
          ))}
        </HStack>
      )}
      {profileData.linktree && (
        <HStack spacing={4}>
          {profileData.linktree.website && (
            <Link href={`https://${profileData.linktree.website}`} isExternal>
              <HStack spacing={1}>
                <i className="bi bi-globe"></i>
                <Text>{profileData.linktree.website}</Text>
              </HStack>
            </Link>
          )}
          {profileData.linktree.github && (
            <Link href={`https://github.com/${profileData.linktree.github}`} isExternal>
              <HStack spacing={1}>
                <i className="bi bi-github"></i>
                <Text>{profileData.linktree.github}</Text>
              </HStack>
            </Link>
          )}
          {profileData.linktree.twitter && (
            <Link href={`https://twitter.com/${profileData.linktree.twitter}`} isExternal>
              <HStack spacing={1}>
                <i className="bi bi-twitter-x"></i>
                <Text>{profileData.linktree.twitter}</Text>
              </HStack>
            </Link>
          )}
          {profileData.linktree.telegram && (
            <Link href={`https://t.me/${profileData.linktree.telegram}`} isExternal>
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
