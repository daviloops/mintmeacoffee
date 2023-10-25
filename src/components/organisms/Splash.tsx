'use client';

import { useEffect } from 'react';
import { Box, Text, Fade, useDisclosure } from "@chakra-ui/react";

const Splash = () => {
  const { isOpen, onToggle } = useDisclosure();

  // useEffect(() => {
  //   setTimeout(() => {
  //     onToggle();
  //   }, 3000);
  // }, []);

  // console.log({isOpen})

  return (
    <Fade in={!isOpen}>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'white',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text fontSize="3xl" color="purple">mint me a coffee</Text>
      </Box>
    </Fade>
  );
};

export default Splash;
