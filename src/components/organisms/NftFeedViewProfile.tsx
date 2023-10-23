'use client';

import { useEffect, useState } from 'react';

import NftFeedView from '@/components/organisms/NftFeedView';
import fetchFeedMintedProfile from "@/data/queries/fetchFeedMintedProfile";
import { WrapPromise } from '@/types';

const NftFeedViewAllProfile = ({ profileId }: { profileId: string }) => {
  const [data, setData] = useState<WrapPromise>();

  useEffect(() => {
    const data = fetchFeedMintedProfile(profileId);
    setData(data);
  }, []);
  
  return <NftFeedView data={data} />;
};

export default NftFeedViewAllProfile;
