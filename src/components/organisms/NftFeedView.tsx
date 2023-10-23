'use client';

import { useState, Suspense, useMemo } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { MintedNft, WrapPromise } from "@/types";

import ErrorBoundary from '@/data/ErrorBoundary';
import NftFeed from "@/components/molecules/NftFeed";
import NftModal from "@/components/organisms/NftModal";
import { Loading } from "@/components/molecules/NftList";

const defaultMintedNft: MintedNft = {
  id: '',
  extra: '',
  receiver: '',
};

const NftFeedView = ({ data }: { data: WrapPromise | undefined }) => {
  const [selectedNft, setSelectedNft] = useState<MintedNft>(defaultMintedNft);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleNftClick = (nft: MintedNft) => {
    setSelectedNft(nft);
    onOpen();
  };

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <NftFeed data={data} handleNftClick={handleNftClick} />
        </Suspense>
      </ErrorBoundary>
      <NftModal nft={selectedNft} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default NftFeedView;
