// components/Header.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { setLocalStorage, getLocalStorage } from './localStorage';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const isSignedInFromData = getLocalStorage('isSignedIn');
    setIsSignedIn(isSignedInFromData ?? false);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-black">
            Ghananese River Running
          </Link>
          <div className="space-x-4">
            <HeaderButton href="/" text="Home" isActive={pathname === '/'} />
            {isSignedIn && (
              <HeaderButton
                href="/stats"
                text="Stats"
                isActive={pathname === '/stats'}
              />
            )}
            {!isSignedIn && (
              <>
                <HeaderButton
                  href="/signin"
                  text="Sign In"
                  isActive={pathname === '/signin'}
                />
                <HeaderButton
                  href="/signup"
                  text="Sign Up"
                  isActive={pathname === '/signup'}
                />
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

interface HeaderButtonProps {
  href: string;
  text: string;
  isActive: boolean;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ href, text, isActive }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className={`font-semibold py-2 px-4 rounded ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-black hover:bg-gray-300'
      }`}
    >
      {text}
    </button>
  );
};

export default Header;