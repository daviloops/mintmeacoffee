'use client';

import { useState, KeyboardEvent, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

import { InputGroup, InputLeftElement, Input, InputRightElement, Button } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const DonateInput = () => {
  const [profileId, setProfileId] = useState('');
  const [donateBtnClicked, setDonateBtnClicked] = useState(false);
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (profileId) {
      router.push(`/${profileId}`);
    }
  };

  const handleChange = ({ target: { value } }: { target: { value: string } }) => setProfileId(value);

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setDonateBtnClicked(true);
      router.push(`/${profileId}`);
    }
  };

  return (
    <InputGroup maxW={[360, 360, 450, 500]}>
      <InputLeftElement h={['32px', '32px', '40px', '40px']} w={['32px', '32px', '40px', '40px']} pointerEvents='none'>
        <Search2Icon fontSize={['sm', 'sm', 'md', 'md']} color='gray.300' />
      </InputLeftElement>
      <Input
        size={['sm', 'sm', 'md', 'md']}
        type='text'
        variant='filled'
        placeholder='Enter a near account to donate to...'
        value={profileId}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        sx={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          paddingRight: ['6.2em', '6.2em', '7em', '7em']
        }}
      />
      <InputRightElement h={['32px', '32px', '40px', '40px']} w={['5.2em', '5.2em', '6.5em', '6.5em']}>
        <Button size={['xs', 'xs', 'sm', 'sm']} isLoading={donateBtnClicked} h='1.75rem' colorScheme="purple" onClick={handleClick}>
          donate 💜
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default DonateInput;