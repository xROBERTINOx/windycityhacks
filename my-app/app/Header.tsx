// components/Header.tsx
'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setLocalStorage, getLocalStorage } from './localStorage';

const Header = () => {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedData = getLocalStorage('isSignedIn');
    if (storedData) {
      setIsSignedIn(storedData);
    }
  }, []);

  useEffect(() => {
    if (isSignedIn !== null) {
      setLocalStorage('isSignedIn', isSignedIn);
    }
  }, [isSignedIn]);



  return (
    <header>
      <div style={{ display: 'flex' }}>
        <button style={{ backgroundColor: 'grey', marginRight: '10px', marginLeft: '10px' }} onClick={() => router.push('/')}>Go to Home</button>
        {isSignedIn === true ? (
          <>
            <button style={{ backgroundColor: 'grey' }} onClick={() => router.push('/stats')}>Go to Your Stats</button>
            <button style={{ backgroundColor: 'grey', marginLeft: '10px' }} onClick={() => router.push('/connect')}>Connect Your Account</button>
          </>
        ) : (
          <>
            <button style={{ backgroundColor: 'grey' }} onClick={() => router.push('/signup')}>Sign Up</button>
            <button style={{ backgroundColor: 'grey', marginLeft: '10px' }} onClick={() => router.push('/signin')}>Sign In</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;