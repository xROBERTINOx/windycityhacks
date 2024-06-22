'use client';
import React, { useState } from 'react';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Perform sign-in logic here

        // Display alert
        alert('User signed in');
    };

    return (
        <div>
            <h1>Hello World</h1>
            <p>Welcome to my Next.js TypeScript page!</p>
            <form>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ backgroundColor: 'black', border: '1px solid white' }}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ backgroundColor: 'black', border: '1px solid white' }}
                    />
                </label>
                <br />
                <button type="button" onClick={handleSignIn}>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
