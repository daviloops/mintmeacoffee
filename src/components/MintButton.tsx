'use client';

import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { MintArgs } from '@mintbase-js/sdk';
import { Button } from '@chakra-ui/react';
import { proxyContractId } from '@/config/constants';

const MintButton = ({ mintArgs, children, ...props }:{ mintArgs: MintArgs, children: React.ReactNode}) => {
  const { selector, activeAccountId } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleMint = async (mintArgs: MintArgs): Promise<void> => {
    setLoading(true);
    const wallet = await selector.wallet();

    const { ownerId, metadata, contractAddress } = mintArgs;

    // *Proxy minter
    await wallet?.signAndSendTransaction({
      signerId: activeAccountId || '',
      receiverId: proxyContractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "mint",
            args: {
              owner_id: ownerId,
              metadata: JSON.stringify(metadata),
              nft_contract_id: contractAddress,
            },
            gas: "200000000000000",
            deposit: "10000000000000000000000",
          },
        },
      ],
      // @ts-ignore
      // successUrl: `${protocol}//${domain}${!port ? "" : ":" + port}`,
    })
    .finally(() => setLoading(false));
  }

  return (
    <Button isLoading={loading} onClick={() => handleMint(mintArgs)} {...props}>
      {children}
    </Button>
  );
};

export default MintButton;
