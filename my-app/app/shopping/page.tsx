'use client';
import React, { useState, useEffect } from 'react';
import Header from '../Header';

const ShoppingPage: React.FC = () => {
    
    const initialFriends = [
        { id: 1, name: "Alice Johnson", level: 15, totalXP: 7500, milesRan: 120 },
        { id: 2, name: "Bob Smith", level: 12, totalXP: 6000, milesRan: 95 },
        { id: 3, name: "Charlie Brown", level: 18, totalXP: 9000, milesRan: 150 },
        { id: 4, name: "Diana Prince", level: 20, totalXP: 10000, milesRan: 180 },
      ];
    
    const [friends, setFriends] = useState(initialFriends);
    const [currentUser, setCurrentUser] = useState({ id: 0, name: "You", level: 14, totalXP: 7000, milesRan: 110 });  
    
    return (
        <div>
            <h1>Popular Watches</h1>
            {/* Add your code for displaying the popular watches section here */}
            
            <h1>Popular Shoes</h1>
            {/* Add your code for displaying the popular shoes section here */}
            
            <h1>Popular Clothing</h1>
            {/* Add your code for displaying the popular clothing section here */}
            return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Yo Bros</h1>

        <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">Daily SUPER Deals</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">MSRP</th>
                  <th className="text-left">Seller</th>
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
        </div>
      </div>
    </div>
  );
        </div>
    );
};

export default ShoppingPage;