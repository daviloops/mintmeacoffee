'use client';

import { FC, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Box, Heading, InputGroup, Input, InputLeftElement, InputRightElement, useDisclosure  } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import { coffeeNftContractId, CONFIG } from '@/config/constants';
import NftList from '@/components/NftList';
import NftModal from '@/components/NftModal';

const HomePage: FC = () => {
  const [nftFeedMinted, setNftFeedMinted] = useState({ data: [], loading: false, error: null });
  const [profileId, setProfileId] = useState('');
  const [donateBtnClicked, setDonateBtnClicked] = useState(false);
  const [selectedNft, setSelectedNft] = useState({});
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    fetch(CONFIG.mbGraphEndpoint, {
      method: "POST",
      headers: {
        "mb-api-key": "omni-site",
        "Content-Type": "application/json",
        "x-hasura-role": "anonymous",
      },
      body: JSON.stringify({
        query: `
          query FetchFeedMintedThings {
            mb_views_nft_activities(
              where: {
                nft_contract_id: {_eq: "${coffeeNftContractId}"}
                kind: {_eq: "mint"}
              },
              limit: 10,
              order_by: {timestamp: desc}
            ) {
                id: token_id
                createdAt: timestamp
                sender: action_sender
                receiver: action_receiver
                title
                description
                extra
                price
                media
                metadata_id
              }
          }
        `,
      }),
    })
    .then(res => res.json())
    .then(res => {
      if (res?.data?.mb_views_nft_activities) {
        setNftFeedMinted({ data: res?.data?.mb_views_nft_activities })
      }
    });
  }, []);


  const memoizedFeedData = useMemo(() => {
    const uniqueMetadataIds = new Set<string>();

    const filteredData = nftFeedMinted.data?.filter((token: any) => {
      if (uniqueMetadataIds.has(token.metadata_id)) {
        return false;
      }

      uniqueMetadataIds.add(token.metadata_id);

      return true;
    });

    return filteredData;
  }, [nftFeedMinted]);

  const handleClick = (e) => {
    e.preventDefault();
    if (profileId) {
      router.push(`/${profileId}`);
    }
  };

  const handleChange = ({ target: { value } }) => setProfileId(value);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setDonateBtnClicked(true);
      router.push(`/${profileId}`);
    }
  };

  const handleNftClick = (nft) => {
    setSelectedNft(nft);
    onOpen();
  };

  return (
    <main>
      <Box p={4}>
        <Heading as='h1' fontSize="8xl" color='purple' sx={{ position: 'relative', lineHeight: '0.8' }}>
          Support people, <br></br> <Box as='span' color='grey' fontSize="6xl">mint them a coffee.</Box>
        </Heading>
      </Box>
      <Box p={4} maxW={500}>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' variant='filled' placeholder='Enter a near account to donate...' value={profileId} onChange={handleChange} onKeyDown={handleKeyPress} />
          <InputRightElement width='6.6rem'>
            <Button isLoading={donateBtnClicked} h='1.75rem' size='sm' colorScheme="purple" onClick={handleClick}>
              donate 💜
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      
      <NftList data={memoizedFeedData} handleNftClick={handleNftClick} m={5} />

      <NftModal nft={selectedNft} isOpen={isOpen} onClose={onClose} />
    </main>
  );
}

export default HomePage;
