'use client';

import { forwardRef, ComponentProps } from 'react';

import { 
  Box,
  Button,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
  useTab,
  useMultiStyleConfig,
  ButtonProps,
} from '@chakra-ui/react';
import NftFeedViewProfile from '@/components/organisms/NftFeedViewProfile';
import Portfolio from '@/components/organisms/Portfolio';

const CustomTab = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const tabProps = useTab({ ...props, ref })
  const isSelected = !!tabProps['aria-selected']

  const styles = useMultiStyleConfig('Tabs', tabProps)

  return (
    <Button _hover={{ '& .cookie': { visibility: 'visible' } }} __css={styles.tab} {...tabProps}>
      <Box as='span' className="cookie" mr='2' sx={{ visibility: isSelected ? 'visible' : 'hidden' }}>
        🍪
      </Box>
      {tabProps.children}
    </Button>
  )
})

const ProfileTabs = ({ profileId }: { profileId: string }) => {
  return (
    <Tabs position="relative" variant="unstyled" textAlign="center" colorScheme="purple">
      <TabList justifyContent="center">
        <CustomTab>Coffees</CustomTab>
        <CustomTab>Portfolio</CustomTab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <NftFeedViewProfile profileId={profileId} />
        </TabPanel>
        <TabPanel>
          <Portfolio />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
