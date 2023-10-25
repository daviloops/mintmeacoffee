'use client';

import { useWallet } from '@mintbase-js/react';
import { Button, useDisclosure } from "@chakra-ui/react";

import MintCoffeeModal from "@/components/organisms/MintCoffeeModal";

const MintCoffeeButton = ({ profileId }: { profileId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connect, isConnected } = useWallet();

  const handleMintButtonClick = () => {
    if (!isConnected) {
      connect();
    } else {
      onOpen();
    };
  };

  return (
    <>
      <Button size={{ base: "sm", sm: "md" }} colorScheme='purple' onClick={handleMintButtonClick}>Mint me a coffee ☕</Button>
      <MintCoffeeModal profileId={profileId} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default MintCoffeeButton;
