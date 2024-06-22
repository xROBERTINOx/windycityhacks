"use client";
import React, { useState, useEffect, useRef, useCallback, act } from 'react';
import { Chart, ScatterController, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';


Chart.register(ScatterController, LinearScale, PointElement, LineElement, Tooltip, Legend);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [activities, setActivities] = useState<any[]>([]);
    const [unit, setUnit] = useState('miles'); // Combine distanceUnit and paceUnit into a single state
    const chartRef= useRef<HTMLCanvasElement | null>(null);
    const chartRefSpeedData= useRef<HTMLCanvasElement | null>(null);
    const [chartData, setChartData] = useState<{ x: number; y: number; }[]>([]);
    const [speedData, setSpeedData] = useState<{ x: number; y: number; }[]>([]);

    useEffect(() => {
        let chartInstanceSpeedData = null;

        if (!isLoading && chartRefSpeedData.current && chartRefSpeedData.current.getContext) {
            const ctx = chartRefSpeedData.current.getContext('2d') as CanvasRenderingContext2D;
            
            chartInstanceSpeedData = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Run # vs. Avg Speed',
                        data: speedData,
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
                                text: 'Run #'
                            }
                        },
                        y: {
                            type: 'linear',
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Avg Speed (minutes per mile)'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Run # vs. Avg Speed'
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstanceSpeedData) {
                chartInstanceSpeedData.destroy();
            }
        };
    }, [isLoading]);

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
                    console.log(data.length)
                    setSpeedData(prevData => {
                        const newDataPointsSpeed = data 
                            .filter((activity: any) => activity.type === 'Run')
                            .map((activity: any, index: number) => ({
                                x: data.length - index,
                                y: (26.8224 / activity.average_speed)
                            }));
                        return [...prevData, ...newDataPointsSpeed];
                    });
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
                <h1>Loaded!</h1>
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
                <canvas ref={chartRefSpeedData}></canvas>
            </div>
        </div>
    );
}

export default App;
