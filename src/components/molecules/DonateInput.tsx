'use client';

import { useState, KeyboardEvent, MouseEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InputGroup, InputLeftElement, Input, InputRightElement, Button } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { validateAccountId } from '@/utils';

const DonateInput = () => {
  const [profileId, setProfileId] = useState('');
  const [donateBtnClicked, setDonateBtnClicked] = useState(false);
  const [isInvalidAccount, setIsInvalidAccount] = useState(false);
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    router.push(`/${profileId}`);
  }, [donateBtnClicked]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateAccountId(profileId)) {
      setDonateBtnClicked(true);
      setIsInvalidAccount(false);
    } else {
      setIsInvalidAccount(true);
    }
  };

  const handleChange = ({ target: { value } }: { target: { value: string } }) => {
    setProfileId(value);
    if (isInvalidAccount && validateAccountId(profileId)) {
       setIsInvalidAccount(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      buttonRef?.current?.click();
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
        isInvalid={isInvalidAccount}
      />
      <InputRightElement h={['32px', '32px', '40px', '40px']} w={['5.2em', '5.2em', '6.5em', '6.5em']}>
        <Button ref={buttonRef} size={['xs', 'xs', 'sm', 'sm']} isLoading={donateBtnClicked} h='1.75rem' colorScheme="purple" onClick={handleClick}>
          donate 💜
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default DonateInput;