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
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const isSignedInFromData = getLocalStorage('isSignedIn');
    const usernameFromData = getLocalStorage('username');
    setIsSignedIn(isSignedInFromData ?? false);
    setUsername(usernameFromData ?? '');
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-black">
            Ghananese River Running
          </Link>
          <div className="flex items-center space-x-4">
            {/* <HeaderButton href="/" text="Home" isActive={pathname === '/'} /> */}
            {isSignedIn && (
              <>
                <HeaderButton
                  href="/dashboard"
                  text="DASH-board"
                  isActive={pathname === '/dashboard'}
                />
                <HeaderButton
                  href="/trainer"
                  text="Trainer"
                  isActive={pathname === '/trainer'}
                />
                <HeaderButton
                  href="/friends"
                  text="Friends"
                  isActive={pathname === '/friends'}
                />
                <HeaderButton
                  href="/competitions"
                  text="Competitions"
                  isActive={pathname === '/competitions'}
                />
                <HeaderButton
                  href="/shopping"
                  text="Shopping"
                  isActive={pathname === '/shopping'}
                />
                <HeaderButton
                  href="/stats"
                  text="Stats"
                  isActive={pathname === '/stats'}
                />
                <span className="ml-4 font-semibold text-gray-700 border border-gray-300 rounded px-3 py-1">
                  {username}
                </span>
              </>
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
          : 'bg-gray-200 text-black hover:black'
      }`}
    >
      {text}
    </button>
  );
};

export default Header;