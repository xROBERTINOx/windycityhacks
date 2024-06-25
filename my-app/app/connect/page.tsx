'use client';
import React from 'react';

const ConnectPage: React.FC = () => {
    const handleConnect = () => {
        const clientId = '127908'; // Your actual client ID
        const redirectUri = encodeURIComponent('http://localhost:3000/connect'); // Updated to match your current page
        const scope = 'read,activity:read_all,profile:read_all';
        
        const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=${scope}`;
        
        window.location.href = stravaAuthUrl;
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button 
                onClick={handleConnect}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
                Connect with Strava
            </button>
        </div>
    );
};

export default ConnectPage;