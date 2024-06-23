'use client';
import React, { use, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../localStorage';    
import { useRouter } from 'next/navigation';
import Header from '../Header';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSignUp = () => {
        if (password !== password2) {
            setErrorMessage('Passwords do not match');
            return;
        } else if (password === password2) {
            setErrorMessage('');
            setLocalStorage('isSignedIn', true);
            setLocalStorage('username', username);
            router.push('/stats');
        }
    };

    return (
        <div>
            <Header />
            <h1>Sign In</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        style={{backgroundColor: 'black', border: '1px solid white'}}
                    />
                </label>
                <br />
                <button type="button" onClick={handleSignUp} style={{border: '1px solid white'}}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignUp;
