export interface MintedNft {
  media?: string,
  id: string,
  extra: string,
  description?: string,
  receiver: string,
  baseUri?: string,
}

export interface FetchFeedMintedData {
  mb_views_nft_activities: Array<MintedNft>,
}

export type WrapPromise = {
  read: Function,
}
