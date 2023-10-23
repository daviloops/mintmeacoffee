'use client';

import { useMemo } from 'react';

import NftList from '@/components/molecules/NftList';
import { FetchFeedMintedData, MintedNft, WrapPromise } from '@/types';

const NftFeed = ({ data, handleNftClick }: { data: WrapPromise | undefined, handleNftClick: Function }) => {
  const mintedNftData: FetchFeedMintedData = data?.read();
  
  const memoizedFeedData: Array<MintedNft> = useMemo(() => {
    
    const uniqueMetadataIds = new Set<string>();
    
    const filteredData = mintedNftData?.mb_views_nft_activities?.filter((token: any) => {
      if (uniqueMetadataIds.has(token.metadata_id)) {
        return false;
      }
      
      uniqueMetadataIds.add(token.metadata_id);
      
      return true;
    });
    
    return filteredData;
    
  }, [mintedNftData]);
  
  

  return <NftList data={memoizedFeedData} handleNftClick={handleNftClick} />;
};

export default NftFeed;
