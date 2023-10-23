import { NEAR_NETWORKS, Network } from '@mintbase-js/sdk';

export const coffeeNftContractId = process.env.NEXT_PUBLIC_MINTBASE_NFT_CONTRACT_ID || ''; // *Nft contract deployed on mintbase website

export const nftContractOwnerId = process.env.NEXT_PUBLIC_MINTBASE_NFT_CONTRACT_OWNER_ID || ''; // *Owner of the nft contract deployed on mintbase website

export const proxyContractId = process.env.NEXT_PUBLIC_PROXY_MINTER_CONTRACT_ADDRESS || ''; // *Proxy for the nft contract deployed on mintbase website (has minter rights)

export const storageBaseUrl = 'https://arweave.net/'; // *Mintbase storage baseUrl

export const coffeeImgId = 'wpSW6-4c8ePFt_mnmGfUin-HQIKkB9RFg8tLq9znWc8'; // *Id of coffee image saved on mintbase storage

export const baseImgUrl = storageBaseUrl + coffeeImgId;

export const deepAiApiKey = process.env.NEXT_PUBLIC_DEEP_AI_API_KEY || '';

export const deepAiDemoApiKey1 = 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K'; // *Please use wisely
export const deepAiDemoApiKey2 = '4173cc7c-7af0-4aad-a499-7258bcddef47'; // *Please use wisely

export const MED_GAS = '300000000000000';
export const network = process.env.NEXT_PUBLIC_NETWORK as Network || NEAR_NETWORKS.TESTNET;
export const ipfsUrl = 'https://ipfs.near.social/ipfs/';

export const TESTNET_CONFIG = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  // change this to your website domain and post-transaction page
  // Todo: change
  callbackUrl: typeof window !== 'undefined' ? `http://${window?.location.host}` : 'https://testnet.mintbase.xyz/success',
  nearSocialContract: 'v1.social08.testnet',
  mbGraphEndpoint: "https://graph.mintbase.xyz/testnet/",
  bosProfilePageUrl: "https://test.near.org/discom.testnet/widget/ProfilePage?accountId=",
};

export const MAINNET_CONFIG = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
  // Todo: change
  callbackUrl: typeof window !== 'undefined' ? `http://${window?.location.host}` : 'https://www.mintbase.xyz/success',
  nearSocialContract: 'social.near',
  mbGraphEndpoint: "https://graph.mintbase.xyz/",
  bosProfilePageUrl: "https://near.org/near/widget/ProfilePage?accountId=",
};

export const CONFIGS = {
  testnet: TESTNET_CONFIG,
  mainnet: MAINNET_CONFIG,
};  

export const CONFIG = CONFIGS[network];
