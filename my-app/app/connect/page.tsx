"use client";
import { useState } from 'react';

const ConnectPage: React.FC = () => {
    const [stravaAccountNumber, setStravaAccountNumber] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStravaAccountNumber(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Strava Account Number:', stravaAccountNumber);
        alert('Connected!');
    };

    return (
        <div style={{ backgroundColor: 'black', color: 'white' }}>
            <h1>Connect Your Account </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="stravaAccountNumber">Strava Account Number: </label>
                <br></br>
                <input
                    type="text"
                    id="stravaAccountNumber"
                    value={stravaAccountNumber}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'black', color: 'white', border: '1px solid white' }}
                />
                <br></br>
                <button type="submit" style={{ backgroundColor: 'grey' }}> Connect</button>
            </form>
        </div>
    );
};

export default ConnectPage;