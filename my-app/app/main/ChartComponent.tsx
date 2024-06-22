'use client'

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ChartComponent() {
  const chartRef = useRef(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = document.getElementById('myChart');
    
    if (ctx) {

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }


      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    
    }
  }, []);

  return <canvas id="myChart"></canvas>;
}