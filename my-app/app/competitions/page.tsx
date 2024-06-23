'use client';
import React, { useState, useEffect } from 'react';
import Header from '../Header';

const ShoppingPage: React.FC = () => {
    
    const nearYouRaces = [
        { id: 1, name: "Cool 5k", location: "Chicago, IL", distance: "5km", date: "8-2-2024" },
        { id: 2, name: "Fly Away 10k", location: "Chicago, IL", distance: "10km", date: "9-12-2024" },
        { id: 3, name: "Nike Nationals", location: "Chicago, IL", distance: "10km", date: "9-14-2024" },
        { id: 4, name: "Apple Half Marathon", location: "Chicago, IL", distance: "13.1m", date: "11-15-2024" },
    ];

    const nationalCompetitions = [
        { id: 1, name: "Chicago Marathon", location: 42195, distance: "meters", date: "2024-10-13" },
    ];

    const InternationalCompetitions = [
        { id: 1, name: "Nike Infinity Run 4", location: 149.99, distance: 189.99, date: "Dicks Sporting Goods" },
        { id: 2, name: "Adidas Ultraboost 22", location: 179.99, distance: 199.99, date: "Adidas" },
        { id: 3, name: "Hoka One One Clifton 8", location: 129.99, distance: 159.99, date: "Hoka One"},
        { i3: 4, name: "Brooks Ghost 14", location: 129.99, distance: 149.99, date: "Brooks" },
    ]

    const completedRaces = [
        { id: 1, name: "Nike Flex Stride 5in", location: 39.99, distance: 49.99, date: "Dicks Sporting Goods" },
        { id: 2, name: "Adidas Own The Run", location: 29.99, distance: 39.99, date: "Adidas" },
        { id: 3, name: "Under Armour Launch SW 7in", location: 34.99, distance: 44.99, date: "Under Armour" },
        { id: 4, name: "New Balance Impact Run 5in", location: 39.99, distance: 49.99, date: "New Balance"}
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
            <h3 className="text-xl font-semibold mb-2">Past Races You've Completed</h3>
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