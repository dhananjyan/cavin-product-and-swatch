import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart object from chart.js

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Ensure previous chart instance is destroyed before creating a new one
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Sample Chart',
              data: [50, 60, 70, 80, 100, 102, 103, 104, 102, 103, 104],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
              labels: ['0', '5', '10', '15', '20', '25', '30', '35'],
              title: {
                display: true,
                // text: 'Months',
              },
            },
            y: {
              ticks: {
                min: 50,
                max: 110,
                stepSize: 10,
                // callback: function (value, index, ticks) {
                //   return '$' + value;
                // },
              },
            },
          },
        },
      });
    }

    // Clean up function to destroy the chart when component unmounts
    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      {/* <h2>Line Chart</h2> */}
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
