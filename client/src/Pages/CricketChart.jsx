// src/CricketChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CricketChart = ({ data }) => {
  // Process the data to create chart data structure
  const chartData = {
    labels: Object.keys(data), // Keys of the data as labels (match IDs)
    datasets: [
      {
        label: 'Bowl',
        data: Object.values(data).map(match => match.bowl),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Runs',
        data: Object.values(data).map(match => match.runs),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Cricket Match Performance',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default CricketChart;
