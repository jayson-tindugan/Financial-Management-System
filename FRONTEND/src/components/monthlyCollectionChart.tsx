import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Collection Cashflow',
    },
  },
};

const MonthlyCollectionChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:8001/transaction/monthlyCollection');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data.message || 'Unknown error');
        setData({ error: 'Error fetching data. Please try again later.' });
      }
    };

    fetchData();
  }, []);  

  if (!data) {
    return <div>Loading...</div>;
  }

  if ('error' in data) {
    return <div>{data.error}</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No chart data</div>;
  }

  const chartData = {
    labels: data.map(entry => entry.month),
    datasets: [
      {
        label: 'Total Inflows',
        data: data.map(entry => entry.cashInflows),
        backgroundColor: 'rgba(75,192,192,0.5)',
      },
      {
        label: 'Total Outflows',
        data: data.map(entry => entry.cashOutflows),
        backgroundColor: 'rgba(255,99,132,0.5)',
      },
      {
        label: 'Cash on Hands',
        data: data.map(entry => entry.cashOnHands),
        backgroundColor: 'rgba(255,206,86,0.5)',
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default MonthlyCollectionChart;
