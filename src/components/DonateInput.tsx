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
    <InputGroup maxW={500}>
      <InputLeftElement pointerEvents='none'>
        <Search2Icon color='gray.300' />
      </InputLeftElement>
      <Input type='text' variant='filled' placeholder='Enter a near account to donate to...' value={profileId} onChange={handleChange} onKeyDown={handleKeyPress} />
      <InputRightElement width='6.6rem'>
        <Button isLoading={donateBtnClicked} h='1.75rem' size='sm' colorScheme="purple" onClick={handleClick}>
          donate 💜
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default DonateInput;