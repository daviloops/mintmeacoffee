import { CONFIG } from '@/config/constants';
import { keyStores, connect } from "near-api-js";

// Todo: integrate social.near profile data to profile
const useNftContract = ({ accountId }: { accountId: string }) => {
  const connectAccount = async () => {
    const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
    const connectionConfig = {
      networkId: CONFIG.networkId,
      nodeUrl: CONFIG.nodeUrl,
      walletUrl: CONFIG.walletUrl,
      helperUrl: CONFIG.helperUrl,
      explorerUrl: CONFIG.explorerUrl,
      myKeyStore, // first create a key store 
    }

    const nearConnection = await connect(connectionConfig);
    const accountConnection = await nearConnection.account(accountId);

    return accountConnection;
  };
  
  const getNftMetadata = async (contractId: string) => {
    const accountConnection = await connectAccount();

    const response = await accountConnection.viewFunction({
      contractId, 
      methodName: "nft_metadata",
      args: {},
    });

    return response;
  };

  const getNftToken = async (contractId: string, tokenId: string) => {
    const accountConnection = await connectAccount();

    const response = await accountConnection.viewFunction({
      contractId, 
      methodName: "nft_token",
      args: {
        token_id: tokenId,
      },
    });

    return response;
  };

  return { getNftMetadata, getNftToken };
};

export default useNftContract;
