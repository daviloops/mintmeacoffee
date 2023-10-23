'use client';

import { useState } from 'react';

import { 
  Box,
  Button,
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
} from '@chakra-ui/react';
import { TokenMetadata, MintArgs } from '@mintbase-js/sdk';
import { useWallet } from '@mintbase-js/react';
import { uploadFile } from '@mintbase-js/storage';
import { coffeeNftContractId, storageBaseUrl, coffeeImgId } from '@/config/constants';
import useImageAi from '@/hooks/useImageAi';
import MintButton from '@/components/atoms/MintButton';

type MintCoffeeModalProps = {
  profileId: string,
  isOpen: boolean,
  onClose: Function,
}

const MintCoffeeModal = ({ profileId, isOpen, onClose, ...props }: MintCoffeeModalProps) => {
  const [fileId, setFileId] = useState<string>('');
  const [loadingBrew, setLoadingBrew] = useState(false);
  const [coffeeDescription, setCoffeeDescription] = useState<string>('');
  const [coffeeMessage, setCoffeeMessage] = useState<string>('');
  
  const { generateImage } = useImageAi();
  const { activeAccountId } = useWallet();
  
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
  });

  const handleBrew = async () => {
    setLoadingBrew(true);

    const url = await generateImage(coffeeDescription);
    
    if (url) {
      const fileImg = await blobUrlToFile(url);
      
      await uploadFile(fileImg)
        .then(res => {
            setFileId(res.id);
          })
        .finally(() => setLoadingBrew(false));
    }
  };

  const resetMintDialog = () => {
    setCoffeeDescription('');
    setCoffeeMessage('');
    setFileId('');
  };


  const handleClose = () => {
    onClose();
    resetMintDialog();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} motionPreset='slideInBottom' isCentered {...props}>
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
                <MintButton mintArgs={mintArgs}>
                  Mint
                </MintButton>
              </>
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintCoffeeModal;
