useEffect(() => {
    let chartInstance = null;

    if (!isLoading && chartRef.current && chartRef.current.getContext) {
        const ctx = chartRef.current.getContext('2d') as CanvasRenderingContext2D;
        
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
