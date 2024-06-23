"use client";
import React, { useState, useEffect, useRef, useCallback, act } from 'react';
import { Chart, ScatterController, LineController, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import Header from '../Header';
import { setLocalStorage, getLocalStorage } from '../localStorage';
import { useRouter } from 'next/navigation';


Chart.register(ScatterController, LineController, LinearScale, PointElement, LineElement, Tooltip, Legend);

function App() {    
    const [isLoading, setIsLoading] = useState(true);
    const [activities, setActivities] = useState<any[]>([]);
    const [unit, setUnit] = useState('miles'); // Combine distanceUnit and paceUnit into a single state
    const chartRef= useRef<HTMLCanvasElement | null>(null);
    const chartRefSpeedData= useRef<HTMLCanvasElement | null>(null);
    const chartRefHeartRateData = useRef<HTMLCanvasElement | null>(null);
    const [chartData, setChartData] = useState<{ x: number; y: number; }[]>([]);
    const [speedData, setSpeedData] = useState<{ x: number; y: number; }[]>([]);
    const [heartRateData, setHeartRateData] = useState<{ x: number; y: number; }[]>([])
    const router = useRouter();


    if (getLocalStorage('isSignedIn') !== true) {
        router.push('/signin');
    }


    function linearRegression(data: { x: number; y: number; }[]) {
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        const n = data.length;
    
        for (let i = 0; i < n; i++) {
            sumX += data[i].x;
            sumY += data[i].y;
            sumXY += data[i].x * data[i].y;
            sumXX += data[i].x * data[i].x;
        }
    
        let slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        let intercept = (sumY - slope * sumX) / n;
    
        return { slope, intercept };
    }

    function heartRatelinearRegression(data: { x: number; y: number | null | undefined; }[]) {
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        let validPoints = 0;
    
        for (const point of data) {
            if (typeof point.y === 'number' && !isNaN(point.y)) {
                sumX += point.x;
                sumY += point.y;
                sumXY += point.x * point.y;
                sumXX += point.x * point.x;
                validPoints++;
            }
        }
    
        if (validPoints < 2) {
            // Not enough valid points to calculate a trend line
            return { heartRateSlope: 0, heartRateIntercept: 0 };
        }
    
        let heartRateSlope = (validPoints * sumXY - sumX * sumY) / (validPoints * sumXX - sumX * sumX);
        let heartRateIntercept = (sumY - heartRateSlope * sumX) / validPoints;
    
        return { heartRateSlope, heartRateIntercept };
    }

    useEffect(() => {
        let chartInstanceSpeedData = null;
        let chartInstanceHeartRateData = null;

        if (!isLoading && chartRefSpeedData.current && chartRefSpeedData.current.getContext && chartRefHeartRateData.current && chartRefHeartRateData.current.getContext) {
            const speedDataCtx = chartRefSpeedData.current.getContext('2d') as CanvasRenderingContext2D;
            const heartRateDataCtx = chartRefHeartRateData.current.getContext('2d') as CanvasRenderingContext2D;
            
            // Calculate linear regression
            const { slope, intercept } = linearRegression(speedData);

            // Generate trend line data
            const trendlineSpeedData = speedData.map(point => ({
                x: point.x,
                y: slope * point.x + intercept
            }));

            const { heartRateSlope, heartRateIntercept } = heartRatelinearRegression(heartRateData);
            
            const trendLineHeartRateData = heartRateData.map(heartpoint => ({
                x: heartpoint.x,
                y: heartRateSlope * heartpoint.x + heartRateIntercept
            }));

            chartInstanceSpeedData = new Chart(speedDataCtx, {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            type: 'scatter',
                            label: 'Run # vs. Avg Speed (Scatter)',
                            data: speedData,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            pointRadius: 6,
                            pointHoverRadius: 8,
                        },
                        {
                            type: 'line',
                            label: 'Speed Trend Line',
                            data: trendlineSpeedData,
                            fill: false,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            pointRadius: 0,
                            tension: 0
                        }
                    ]
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
                            text: 'Run # vs. Avg Speed with Trend Line'
                        },
                        legend: {
                            display: true
                        }
                    }
                }
            });

            chartInstanceHeartRateData = new Chart(heartRateDataCtx, {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            type: 'scatter',
                            label: 'Run # vs. Avg Heart Rate',
                            data: heartRateData,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            pointRadius: 6,
                            pointHoverRadius: 8,
                        },
                        {
                            type: 'line',
                            label: 'Heart Rate Trend Line',
                            data: trendLineHeartRateData,
                            fill: false,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            pointRadius: 0,
                            tension: 0
                        }
                    ]
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
                            text: 'Run # vs. Avg Speed with Trend Line'
                        },
                        legend: {
                            display: true
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
                // console.log(data); // Log activities to console
                
                if (unit === 'miles') {
                    const newDataPoints = data
                        .filter((activity: any) => activity.type === 'Run')
                        .map((activity: any) => ({
                            x: (activity.distance / 1609.344).toFixed(2),
                            y: (26.8224 / activity.average_speed)
                        }));  
                    setChartData(prevData => [...prevData, ...newDataPoints]);  
                    // console.log(data.length)
                    setSpeedData(prevData => {
                        const newDataPointsSpeed = data 
                            .filter((activity: any) => activity.type === 'Run')
                            .map((activity: any, index: number) => ({
                                x: data.length - index,
                                y: (26.8224 / activity.average_speed)
                            }));
                        return [...prevData, ...newDataPointsSpeed];
                    });
                    setHeartRateData(prevData => {
                        const newDataPointsHeartRate = data
                        .filter((activity: any) => activity.type === 'Run')
                        .map((activity: any, index: number) => ({
                            x: data.length - index,
                            y: activity.average_heartrate
                        }))
                        return [...prevData, ...newDataPointsHeartRate];
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
        <div className="container mx-auto px-4 py-8">
          <Header />
          <h1 className="text-4xl font-bold mb-8 text-center">Your Running Stats</h1>
      
          <div className="mb-8">
            <label htmlFor="unit" className="text-black mr-2 font-semibold">Unit:</label>
            <select 
              id="unit" 
              value={unit} 
              onChange={(e) => setUnit(e.target.value)}
              className="bg-white text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="miles">Miles</option>
              <option value="kilometers">Kilometers</option>
            </select>
          </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {showActivities()}
          </div>
      
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">Performance Charts</h2>
            <div className="space-y-8">
              <div>
                <canvas ref={chartRef}></canvas>
              </div>
              <div>
                <canvas ref={chartRefSpeedData}></canvas>
              </div>
              <div>
                <canvas ref={chartRefHeartRateData}></canvas>
              </div>
            </div>
          </div>
        </div>
      );
}

export default App;
