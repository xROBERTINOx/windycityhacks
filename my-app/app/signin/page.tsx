'use client';
import React, { useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../localStorage';    
import { useRouter } from 'next/navigation';
import Header from '../Header';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignIn = () => {
        setLocalStorage('isSignedIn', true);
        setLocalStorage('username', username);
        router.push('/stats');
    };

    return (
        <div>
            <Header />
            <h1>Sign In Page</h1>
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
                <button type="button" onClick={handleSignIn} style={{border: '1px solid white'}}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignIn;
