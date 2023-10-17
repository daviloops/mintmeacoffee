import { CONFIG } from '@/config/constants';
import { keyStores, connect } from "near-api-js";

// Todo: integrate social.near profile data to profile
const useSocialDBContract = async () => {
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

  const getProfileData = async (profileId: string) => {
    const response = await (await nearConnection.account(profileId)).viewFunction({
      contractId: CONFIG.nearSocialContract, 
      methodName: "get",
      args: { keys: [`${profileId}/profile/**`] },
    });

    return response;
  };

  return { getProfileData };
};

export default useSocialDBContract;
