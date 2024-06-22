"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chart, ScatterController, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';


Chart.register(ScatterController, LinearScale, PointElement, LineElement, Tooltip, Legend);





function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [activities, setActivities] = useState<any[]>([]);
    const [unit, setUnit] = useState('miles'); // Combine distanceUnit and paceUnit into a single state
    const chartRef= useRef(null);
    const [chartData, setChartData] = useState<{ x: number; y: number; }[]>([]);

    useEffect(() => {
        let chartInstance = null;

        if (!isLoading && chartRef.current && chartRef.current.getContext) {
            const ctx = chartRef.current.getContext('2d');
            
            chartInstance = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Run Distance vs. Pace',
                        data: chartData,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        pointRadius: 6,
                        pointHoverRadius: 8,
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Distance (miles)'
                            }
                        },
                        y: {
                            type: 'linear',
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Pace (minutes/mile)'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Run Distance vs. Pace'
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [isLoading]);

    const addDataPoint = useCallback((x1: number, y1: number) => {
        setChartData(prevData => [...prevData, {x: x1, y: y1}]);
    }, []);


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
                
                if (unit === 'miles') {
                    const newDataPoints = data
                        .filter((activity: any) => activity.type === 'Run')
                        .map((activity: any) => ({
                            x: (activity.distance / 1609.344).toFixed(2),
                            y: (26.8224 / activity.average_speed)
                        }));  
                    setChartData(prevData => [...prevData, ...newDataPoints]);  
                } else {
                    const newDataPoints = data
                        .filter((activity: any) => activity.type === 'Run')
                        .map((activity: any) => ({
                            x: (activity.distance / 1000).toFixed(2),
                            y: (16.6667 / activity.average_speed)
                        }));
                    setChartData(prevData => [...prevData, ...newDataPoints]);
                }
            })
            .catch(e => console.log(e));
    }


    function showActivities() {
        if (isLoading) return <>LOADING</>;
        if (!isLoading) {
            return (
                <ul>
                    {activities.map(activity => (
                        <li key={activity.id}>
                            {activity.name}, distance: {unit === 'miles' ? (activity.distance / 1609.344).toFixed(2) + ' miles' : (activity.distance / 1000).toFixed(2) + ' kilometers'}, 
                            avg pace: {calculatePace(activity.average_speed)}
                        </li>
                        
                    ))}
                </ul>
            );
        }
    }

    function calculatePace(speed: number) {
        if (unit === 'miles') {
            const pace = 26.8224 / speed;
            const minutes = Math.floor(pace);
            const seconds = Math.floor((pace - minutes) * 60);
            return `${minutes}:${seconds < 10 ? '0' + seconds : seconds} per mile`;
        } else if (unit === 'kilometers') {
            const pace = 16.6667 / speed;
            const minutes = Math.floor(pace);
            const seconds = Math.floor((pace - minutes) * 60);
            return `${minutes}:${seconds < 10 ? '0' + seconds : seconds} per kilometer`;
        }
    }

    return (
        <div className="App">
            <div>
                <label htmlFor="unit">Unit:</label>
                <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} style={{ backgroundColor: 'black', color: 'white', border: '1px solid white' }}>
                    <option value="miles">Miles</option>
                    <option value="kilometers">Kilometers</option>
                </select>
            </div>
            {showActivities()}
            <div style={{ width: '80%', maxWidth: '600px', margin: '20px auto' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default App;
