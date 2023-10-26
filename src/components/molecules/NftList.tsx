'use client';

import { useState, useEffect } from 'react';

import { Grid, GridItem, Image, Card, Skeleton } from '@chakra-ui/react';
import { coffeeNftContractId } from '@/config/constants';
import { MintedNft } from '@/types';
import { appendPath } from '@/utils';
import useNftContract from '@/hooks/useNftContract';

export const Loading = () =>
  <Grid templateColumns='repeat(5, 1fr)' gap={6}>
    {[...Array(5)].map((_, index) => (
      <Card sx={{ borderRadius: '8px' }} key={index}>
        <Skeleton sx={{ borderRadius: '8px' }} height="17.5vw" />
      </Card>
      ))}
  </Grid>;

const NftList = ({ data, handleNftClick, ...props }: { data: Array<MintedNft>, handleNftClick: Function }) => {
  const [baseUri, setBaseUri] = useState<string>('');
  const { getBaseUri } = useNftContract({ accountId: coffeeNftContractId}) 

  useEffect(() => {
    getBaseUri(coffeeNftContractId)
      .then(res => setBaseUri(res));
  }, [getBaseUri]);

  return (
    <Grid templateColumns={['repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)', 'repeat(6, 1fr)']} gap={[4, 5, 6, 6]} {...props}>
      {data?.map(item => (
        <GridItem w='100%' key={item.id}>
          {/* // Todo: check case no media */}
          <Card
            onClick={() => handleNftClick(item)}
            _hover={{ transform: 'scale(1.02)', opacity: '0.9', cursor: 'pointer' }}
            _active={{ transform: 'scale(0.98)' }}
            _expanded={{ transform: 'scale(1)' }}
            sx={{
              borderRadius: '8px',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {baseUri && item.media && (
              <Image alt="Coffee nft" src={appendPath(baseUri, item.media)} sx={{ borderRadius: '8px' }} />
            )}
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}

export default NftList;
