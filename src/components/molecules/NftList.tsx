'use client';

import { Grid, GridItem, Image, Card, Skeleton } from '@chakra-ui/react';
import { storageBaseUrl } from '@/config/constants';
import { MintedNft } from '@/types';

export const Loading = () =>
  <Grid templateColumns='repeat(5, 1fr)' gap={6}>
    {[...Array(5)].map(item => (
      <Card sx={{ borderRadius: '8px' }}>
        <Skeleton sx={{ borderRadius: '8px' }} height="17.5vw" />
      </Card>
      ))}
  </Grid>;

const NftList = ({ data, handleNftClick, ...props }: { data: Array<MintedNft>, handleNftClick: Function }) => 
  <Grid templateColumns='repeat(5, 1fr)' gap={6} {...props}>
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
          <Image src={item.media ? `${storageBaseUrl}${item.media}` : undefined} sx={{ borderRadius: '8px' }} />
        </Card>
      </GridItem>
    ))}
  </Grid>;

export default NftList;
