// app/friends/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { setLocalStorage, getLocalStorage } from '../localStorage';
import { useRouter } from 'next/navigation';




// Mock data for friends
const initialFriends = [
  { id: 1, name: "Alice Johnson", level: 15, totalXP: 7500, milesRan: 120 },
  { id: 2, name: "Bob Smith", level: 12, totalXP: 6000, milesRan: 95 },
  { id: 3, name: "Charlie Brown", level: 18, totalXP: 9000, milesRan: 150 },
  { id: 4, name: "Diana Prince", level: 20, totalXP: 10000, milesRan: 180 },
];

const FriendsPage = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState({ id: 0, name: "You", level: 14, totalXP: 7000, milesRan: 110 });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // In a real app, you would make an API call here to search for friends
  };

  const router = useRouter();
  if (getLocalStorage('isSignedIn') !== true) {
    router.push('/signin');
}


  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Yo Bros</h1>

        <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for friends..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4"
            />
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Level</th>
                  <th className="text-left">Total XP</th>
                  <th className="text-left">Miles (30 days)</th>
                </tr>
              </thead>
              <tbody>
                {[...friends, currentUser]
                  .sort((a, b) => b.totalXP - a.totalXP)
                  .map((friend) => (
                    <tr key={friend.id} className={friend.id === 0 ? "font-bold" : ""}>
                      <td>{friend.name}</td>
                      <td>{friend.level}</td>
                      <td>{friend.totalXP}</td>
                      <td>{friend.milesRan}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">Da Homies</h3>
            <ul>
              {friends.map((friend) => (
                <li key={friend.id} className="mb-2">
                  {friend.name} - Level {friend.level}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;