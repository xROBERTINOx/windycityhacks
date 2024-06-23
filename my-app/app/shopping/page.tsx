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

    const initialItems = [
        { id: 1, name: "Garmin Forerunner 255S", price: 304.99, msrp: 349.99, seller: "Amazon" },
        { id: 2, name: "Nike Infinity Run 4", price: 149.99, msrp: 189.99, seller: "Dicks Sporting Goods" },
        { id: 3, name: "Apple Watch Series 9", price: 324.99, msrp: 399.99, seller: "BestBuy" },
        { id: 4, name: "Salomon Adv Skin 12 Set Hydration Vest", price: 114.99, msrp: 164.99, seller: "REI Co-op" },
    ];

    const initialPopularWatches = [
        { id: 1, name: "Garmin Forerunner 255S", price: 304.99, msrp: 349.99, seller: "Amazon" },
        { id: 2, name: "Apple Watch Series 9", price: 324.99, msrp: 399.99, seller: "BestBuy" },
        { id: 3, name: "Fitbit Charge 5", price: 149.99, msrp: 179.99, seller: "Walmart" },
        { id: 4, name: "Polar Vantage V2", price: 499.99, msrp: 549.99, seller: "Target" },
    ]

    const initialPopularShoes = [
        { id: 1, name: "Nike Infinity Run 4", price: 149.99, msrp: 189.99, seller: "Dicks Sporting Goods" },
        { id: 2, name: "Adidas Ultraboost 22", price: 179.99, msrp: 199.99, seller: "Adidas" },
        { id: 3, name: "Hoka One One Clifton 8", price: 129.99, msrp: 159.99, seller: "Hoka One"},
        { i3: 4, name: "Brooks Ghost 14", price: 129.99, msrp: 149.99, seller: "Brooks" },
    ]

    const initialPopularShorts = [
        { id: 1, name: "Nike Flex Stride 5in", price: 39.99, msrp: 49.99, seller: "Dicks Sporting Goods" },
        { id: 2, name: "Adidas Own The Run", price: 29.99, msrp: 39.99, seller: "Adidas" },
        { id: 3, name: "Under Armour Launch SW 7in", price: 34.99, msrp: 44.99, seller: "Under Armour" },
        { id: 4, name: "New Balance Impact Run 5in", price: 39.99, msrp: 49.99, seller: "New Balance"}
    ];
    
    const [items, setItems] = useState(initialItems);
    const [currentUser, setCurrentUser] = useState({ id: 0, name: "You", level: 14, totalXP: 7000, milesRan: 110 });  
    
    return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Shopping</h1>
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
                  <th className='text-left'>Link</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className={item.id === 0 ? "font-bold" : ""}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.msrp}</td>
                    <td>{'seller' in item ? item.seller : ''}</td>
                    <td>Click me</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">Watch Deals</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">MSRP</th>
                  <th className="text-left">Seller</th>
                  <th className='text-left'>Link</th>
                </tr>
              </thead>
              <tbody>
                {initialPopularWatches.map((watch) => (
                  <tr key={watch.id} className={watch.id === 0 ? "font-bold" : ""}>
                    <td>{watch.name}</td>
                    <td>{watch.price}</td>
                    <td>{watch.msrp}</td>
                    <td>{'seller' in watch ? watch.seller : ''}</td>
                    <td>Click me</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">Shoes Deals</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">MSRP</th>
                  <th className="text-left">Seller</th>
                  <th className='text-left'>Link</th>
                </tr>
              </thead>
              <tbody>
                {initialPopularShoes.map((shoe) => (
                  <tr key={shoe.id} className={shoe.id === 0 ? "font-bold" : ""}>
                    <td>{shoe.name}</td>
                    <td>{shoe.price}</td>
                    <td>{shoe.msrp}</td>
                    <td>{'seller' in shoe ? shoe.seller : ''}</td>
                    <td>Click me</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-2">Short-Shorts Deals</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">MSRP</th>
                  <th className="text-left">Seller</th>
                  <th className='text-left'>Link</th>
                </tr>
              </thead>
              <tbody>
                {initialPopularShorts.map((short) => (
                  <tr key={short.id} className={short.id === 0 ? "font-bold" : ""}>
                    <td>{short.name}</td>
                    <td>{short.price}</td>
                    <td>{short.msrp}</td>
                    <td>{'seller' in short ? short.seller : ''}</td>
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