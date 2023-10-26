import { useState, useEffect } from 'react';

import { Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, Image, Box, Text, Avatar } from '@chakra-ui/react';

import { coffeeNftContractId } from '@/config/constants';
import { MintedNft } from '@/types';
import { appendPath } from '@/utils';
import useNftContract from '@/hooks/useNftContract';

interface NftModalI {
  nft: MintedNft,
  isOpen: boolean,
  onClose: () => void,
}

const NftModal = ({ nft, isOpen, onClose }: NftModalI) => {
  const [showImage, setShowImage] = useState(true);
  const [baseUri, setBaseUri] = useState<string>('');
  const { getBaseUri } = useNftContract({ accountId: coffeeNftContractId}) 

  useEffect(() => {
    getBaseUri(coffeeNftContractId)
      .then(res => setBaseUri(res));
  }, [getBaseUri]);

  const decodeExtra = (extra: string) =>  extra ? JSON.parse(extra) : {};

  const getMessage = () => decodeExtra(nft.extra).message || '';

  const getSigner = () => decodeExtra(nft.extra).signer || '';

  const handleToggle = () => setShowImage(prev => !prev);

  const handleClose = () => {
    onClose();
    setShowImage(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>#{nft.id}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showImage ? (
            <Image alt="coffee base" _hover={{ cursor: 'pointer' }} src={appendPath(baseUri, nft.media)} onClick={handleToggle} />
          ) : (
            <Box backgroundColor="purple.100" _hover={{ cursor: 'pointer' }} p={2} sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleToggle}>
              <Text as="i" textAlign="center" color="purple"  fontSize={{ base: "lg", sm: "xl" }}>{nft.description}</Text>
            </Box>
          )}
          <Box p={2}>
            <Box display="flex" alignItems="center" mt={2}>
              <Avatar size="sm" mr={2} />
              <Text fontSize={{ base: "sm", sm: "md" }}>{nft.receiver}</Text>
            </Box>
            <Box mt={2} mb={4} textAlign={!!getMessage() ? undefined : 'center'}>
              <Text fontSize={{ base: "sm", sm: "md" }} as="i">{getMessage() || 'No message'}</Text>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="flex-end" my={2}>
              <Avatar size="sm" mr={2} />
              <Text fontSize={{ base: "sm", sm: "md" }}>{getSigner()}</Text>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NftModal;
