// components/Header.tsx
'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setLocalStorage, getLocalStorage } from './localStorage';

const Header = () => {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState<boolean>();

  useEffect(() => {
    const isSignedInFromData = getLocalStorage('isSignedIn');
    setIsSignedIn(isSignedInFromData ?? false);
  }, []); 

  return (
    <header>
      <div style={{ display: 'flex' }}>
        <button style={{ backgroundColor: 'grey', marginRight: '10px', marginLeft: '10px' }} onClick={() => router.push('/')}>Go to Home</button>
        {isSignedIn && <button style={{ backgroundColor: 'grey', marginRight: '10px' }} onClick={() => router.push('/stats')}>Go to Stats</button>}
        {!isSignedIn && <button style={{ backgroundColor: 'grey', marginRight: '10px' }} onClick={() => router.push('/signin')}>Sign In</button>}
        {!isSignedIn && <button style={{ backgroundColor: 'grey' }} onClick={() => router.push('/signup')}>Sign Up</button>}
      </div>
    </header>
  );
};

export default Header;