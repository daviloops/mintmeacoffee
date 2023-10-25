import { CONFIG } from '@/config/constants';
import { keyStores, connect } from "near-api-js";

const useSocialDB = ({ accountId }: { accountId: string }) => {
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
  
  const getProfileData = async (profileId: string) => {
    const accountConnection = await connectAccount();

    const response = await accountConnection.viewFunction({
      contractId: CONFIG.nearSocialContract, 
      methodName: "get",
      args: {
        keys: [`${profileId}/profile/**`],
      },
    });

    return response;
  };

  return { getProfileData };
};

export default useSocialDB;
