// app/dashboard/page.tsx
'use client';
import React, { useState } from 'react';
import Header from '../Header';

const Dashboard = () => {
  const [leaderboardScope, setLeaderboardScope] = useState<'nationwide' | 'worldwide'>('nationwide');

  // Mock data - replace with actual data fetching in a real application
  const xp = 1250;
  const level = 5;
  const maxXp = 2000;
  const leaderboard = [
    { name: 'Runner1', xp: 2500 },
    { name: 'Runner2', xp: 2300 },
    { name: 'Runner3', xp: 2100 },
    { name: 'You', xp: 1250 },
    { name: 'Runner5', xp: 1000 },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">DASH-board</h1>

        {/* XP and Level Progress */}
        <section className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="mb-2">
            <span className="font-medium">Level {level}</span>
            <span className="float-right">{xp} / {maxXp} XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{width: `${(xp / maxXp) * 100}%`}}
            ></div>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="bg-gray-900 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Leaderboard</h2>
            <select 
              value={leaderboardScope}
              onChange={(e) => setLeaderboardScope(e.target.value as 'nationwide' | 'worldwide')}
              className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1"
            >
              <option value="nationwide">Nationwide</option>
              <option value="worldwide">Worldwide</option>
            </select>
          </div>
          <ul>
            {leaderboard.map((runner, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                <span>{runner.name}</span>
                <span>{runner.xp} XP</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;