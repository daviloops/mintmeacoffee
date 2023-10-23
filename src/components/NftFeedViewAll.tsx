'use client';

import NftFeedView from '@/components/NftFeedView';
import fetchFeedMintedAll from "@/data/queries/fetchFeedMintedAll";

const data = fetchFeedMintedAll();

const NftFeedViewAll = () => <NftFeedView data={data} />;

export default NftFeedViewAll;
