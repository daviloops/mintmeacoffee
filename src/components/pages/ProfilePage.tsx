'use client';

import { FC, useState, useEffect, useMemo, forwardRef } from 'react';

import { 
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  ButtonGroup,
  Image,
  Avatar,
  Text,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
  VStack,
  useTab,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { TokenMetadata, MintArgs } from '@mintbase-js/sdk';
import { useWallet } from '@mintbase-js/react';
import { uploadFile } from '@mintbase-js/storage';

import { coffeeNftContractId, storageBaseUrl, CONFIG, coffeeImgId } from '@/config/constants';
import useImageAi from '@/hooks/useImageAi';
import MintButton from '@/components/MintButton';
import NftList from '@/components/NftList';
import NftModal from '@/components/NftModal';
import { MintedNft } from '@/types/types';

interface pageProps {
  profileId: string
}

const ProfilePage: FC<pageProps> = ({ profileId }) => {
  const [fileId, setFileId] = useState<string>('');
  const { generateImage } = useImageAi();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coffeeDescription, setCoffeeDescription] = useState<string>('');
  const [coffeeMessage, setCoffeeMessage] = useState<string>('');
  const [nftFeedMinted, setNftFeedMinted] = useState({ data: [], loading: false, error: null });
  const [selectedNft, setSelectedNft] = useState<MintedNft | {}>({});
  const [loadingBrew, setLoadingBrew] = useState(false);
  const { isOpen: isNftViewerOpen, onOpen: onNftViewerOpen, onClose: onNftViewerClose } = useDisclosure();
  const { activeAccountId } = useWallet();

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
                action_receiver: {_eq: "${profileId}"}
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
        setNftFeedMinted({ data: res?.data?.mb_views_nft_activities });
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

  const tokenMetadata: TokenMetadata = {
    media: fileId,
    reference: fileId,
    description: coffeeDescription,
    extra: JSON.stringify({
      message: coffeeMessage,
      signer: activeAccountId,
    }),
  }

  const mintArgs: MintArgs = {
    contractAddress: coffeeNftContractId || '',
    ownerId: profileId,
    metadata: tokenMetadata,
  };

  const handleCoffeeDescriptionChange = ({ target: { value } }: { target: { value: string } }) => setCoffeeDescription(value);

  const handleCoffeeMessageChange = ({ target: { value } }: { target: { value: string } }) => setCoffeeMessage(value);
  
  const blobUrlToFile = (blobUrl:string): Promise<File> => new Promise((resolve) => {
    fetch(blobUrl).then((res) => {
      res.blob().then((blob) => {
        const file = new File([blob], '.jpg', {type: blob.type})
        resolve(file)
      })
    })
  })

  const handleBrew = async () => {
    setLoadingBrew(true);
    const url = await generateImage(coffeeDescription);
    
    const fileImg = await blobUrlToFile(url);
    
    await uploadFile(fileImg)
      .then(res => {
          setFileId(res.id);
        })
      .finally(() => setLoadingBrew(false));
  };

  const CustomTab = forwardRef((props, ref) => {
    const tabProps = useTab({ ...props, ref })
    const isSelected = !!tabProps['aria-selected']

    const styles = useMultiStyleConfig('Tabs', tabProps)

    return (
      <Button _hover={{ '& .cookie': { visibility: 'visible' } }} __css={styles.tab} {...tabProps}>
        <Box as='span' className="cookie" mr='2' sx={{ visibility: isSelected ? 'visible' : 'hidden' }}>
          🍪
        </Box>
        {tabProps.children}
      </Button>
    )
  })

  const handleNftClick = (item: MintedNft) => {
    setSelectedNft(item);
    onNftViewerOpen();
  };

  return (
    <main>
      <VStack mx={6} mb={3} gap={2}>
        <Avatar size="xl" />
        <Text fontSize="2xl" >{profileId}</Text>
        <Box mb={2} sx={{ maxWidth: "700px", textAlign: "center" }}>
          <Text as="i">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequatur culpa veniam cumque sint dignissimos necessitatibus
            quod labore eligendi veritatis. At quibusdam architecto eaque explicabo fugit, rerum iusto dignissimos ratione."
          </Text>
        </Box>
        <Button colorScheme='purple' onClick={onOpen}>Mint me a coffee ☕</Button>
      </VStack>

      <Tabs position="relative" variant="unstyled" textAlign="center" colorScheme="purple">
        <TabList justifyContent="center">
          <CustomTab>Coffees</CustomTab>
          <CustomTab>Portfolio</CustomTab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <NftList data={memoizedFeedData} handleNftClick={handleNftClick} m={6} />
          </TabPanel>
          <TabPanel>
            <p>Coming soon...!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="purple">Coffee brewer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box px={4} pb={4} display="flex" justifyContent="center">
              <Image width={360} src={fileId ? storageBaseUrl + fileId : storageBaseUrl + coffeeImgId} alt="Brewed coffee" />
            </Box>
            {!fileId ? (
              <Box px={4}>
                <Textarea variant="filled" value={coffeeDescription} onChange={handleCoffeeDescriptionChange} placeholder='Enter a description to edit the coffee...' />
              </Box>
            ) : (
              <Box px={4}>
                <Textarea variant="filled" value={coffeeMessage} onChange={handleCoffeeMessageChange} placeholder={`Enter a message for ${profileId}...`}  />
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <ButtonGroup spacing='4'>
              {!fileId ? (
                <Button isDisabled={!coffeeDescription} isLoading={loadingBrew} colorScheme='purple' onClick={handleBrew}>
                  Brew
                </Button>
              ) : (
                <>
                  <Button variant='outline' colorScheme='teal' onClick={() => setFileId('')}>
                    Back
                  </Button>
                  <MintButton isDisabled={!fileId} mintArgs={mintArgs} colorScheme='purple'>
                    Mint
                  </MintButton>
                </>
              )}
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <NftModal nft={selectedNft} isOpen={isNftViewerOpen} onClose={onNftViewerClose} />

    </main>
  );
}

export default ProfilePage;