'use client';
import React, { useState, useEffect } from 'react';
import Header from '../Header';

import { setLocalStorage, getLocalStorage } from '../localStorage';
import { useRouter } from 'next/navigation';




const ShoppingPage: React.FC = () => {
    
    const router = useRouter();
    if (getLocalStorage('isSignedIn') !== true) {
      router.push('/signin');
  }
  

    const nearYouRaces = [
        { id: 1, name: "Cool 5k", location: "Chicago, IL", distance: "5km", date: "8-2-2024" },
        { id: 2, name: "Fly Away 10k", location: "Chicago, IL", distance: "10km", date: "9-12-2024" },
        { id: 3, name: "Nike Nationals", location: "Chicago, IL", distance: "10km", date: "9-14-2024" },
        { id: 4, name: "Apple Half Marathon", location: "Chicago, IL", distance: "13.1m", date: "11-15-2024" },
    ];

    const nationalCompetitions = [
        { id: 1, name: "Chicago Marathon", location: "Chicago, IL", distance: "13.1m", date: "2024-10-13" },
        { id: 2, name: "New York City Marathon", location: "New York, NY", distance: "13.1m", date: "2024-11-03" },
        { id: 3, name: "Boston 10K for kids", location: "Boston, MA", distance: "10km", date: "2024-10-12" },
        { id: 4, name: "Atlanta Peach ultra marathon", location: "Atlanta, GA", distance: "50km", date: "2024-07-04" },
    ];

    const InternationalCompetitions = [
        { id: 1, name: "London Marathon", location: "London, UK", distance: "26.2m", date: "2024-10-13" },
        { id: 2, name: "Paris Marathon", location: "Paris, France", distance: "26.2m", date: "2024-11-03" },
        { id: 3, name: "Berlin Marathon", location: "Berlin, Germany", distance: "26.2m", date: "2024-10-12" },
        { id: 4, name: "Tokyo Marathon", location: "Tokyo, Japan", distance: "26.2m", date: "2024-07-04" },
    ]

    const completedRaces = [
        { id: 1, name: "Tryhard 5k", location: "Chicago, IL", distance: "5km", date: "8-2-2023" },
        { id: 2, name: "All in 10k", location: "Chicago, IL", distance: "10km", date: "9-12-2023" },
        { id: 3, name: "Iphone release 10Km", location: "Chicago, IL", distance: "10km", date: "9-14-2023" },
        { id: 4, name: "Boston Marathon", location: "Chicago, IL", distance: "13.1m", date: "11-15-2023" },
    ];
    
    return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Competitions</h1>
        <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
          
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">Near you (Illinois)</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Location</th>
                  <th className="text-left">Distance</th>
                  <th className="text-left">Date</th>
                  <th className='text-left'>Link</th>
                </tr>
              </thead>
              <tbody>
                {nearYouRaces.map((race) => (
                  <tr key={race.id} className={race.id === 0 ? "font-bold" : ""}>
                    <td>{race.name}</td>
                    <td>{race.location}</td>
                    <td>{race.distance}</td>
                    <td>{'date' in race ? race.date : ''}</td>
                    <td>Click me</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">National Competitions</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Location</th>
                  <th className="text-left">Distance</th>
                  <th className="text-left">Date</th>
                  <th className='text-left'>Link</th>
                </tr>
              </thead>
              <tbody>
                {nationalCompetitions.map((race) => (
                  <tr key={race.id} className={race.id === 0 ? "font-bold" : ""}>
                    <td>{race.name}</td>
                    <td>{race.location}</td>
                    <td>{race.distance}</td>
                    <td>{'date' in race ? race.date : ''}</td>
                    <td>Click me</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">International Competitions</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Location</th>
                  <th className="text-left">Distance</th>
                  <th className="text-left">Date</th>
                  <th className='text-left'>Link</th>
                </tr>
              </thead>
              <tbody>
                {InternationalCompetitions.map((race) => (
                  <tr key={race.id} className={race.id === 0 ? "font-bold" : ""}>
                    <td>{race.name}</td>
                    <td>{race.location}</td>
                    <td>{race.distance}</td>
                    <td>{'date' in race ? race.date : ''}</td>
                    <td>Click me</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">Past Races You&apos;ve Completed</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Location</th>
                  <th className="text-left">Distance</th>
                  <th className="text-left">Date</th>
                  <th className='text-left'>Link</th>
                </tr>
              </thead>
              <tbody>
                {completedRaces.map((race) => (
                  <tr key={race.id} className={race.id === 0 ? "font-bold" : ""}>
                    <td>{race.name}</td>
                    <td>{race.location}</td>
                    <td>{race.distance}</td>
                    <td>{'date' in race ? race.date : ''}</td>
                    <td>Click me</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
    );
};

export default ShoppingPage;