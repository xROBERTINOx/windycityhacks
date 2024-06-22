"use client";
import React, { useState, useEffect } from 'react';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [activities, setActivities] = useState<any[]>([]);

    // Strava Credentials
    let clientID = "127908";
    let clientSecret = "918d9334b7479e49becbde94c3eeec4f03b4d06a";

    // refresh token and call address
    const refreshToken = "a3ec90ef220e6dc7f639d6a80f7ef5078c756d25";
    const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;

    // endpoint for read-all activities. temporary token is added in getActivities()
    const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

    // Use refresh token to get current access token
    useEffect(() => {
        fetch(callRefresh, {
            method: 'POST'
        })
        .then(res => res.json())
        .then(result => getActivities(result.access_token))
    }, [callRefresh]);

    // use current access token to call all activities
    function getActivities(access: string) {
        fetch(callActivities + access)
            .then(res => res.json())
            .then(data => {
                setActivities(data);
                setIsLoading(false);
                console.log(data); // Log activities to console
            })
            .catch(e => console.log(e));
    }

    function showActivities() {
        if (isLoading) return <>LOADING</>;
        if (!isLoading) {
            return (
                <ul>
                    {activities.map(activity => (
                        <li key={activity.id}>{activity.name}</li>
                    ))}
                </ul>
            );
        }
    }

    return (
        <div className="App">
            {showActivities()}
        </div>
    );
}

export default App;