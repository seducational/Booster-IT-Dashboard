import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { GraphUp } from 'react-bootstrap-icons';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        usePointStyle: true,
        color: '#555',
        boxWidth: 8
      }
    }
  },
  scales: {
    x: {
      grid: { color: '#f3f4f6' },
      ticks: { color: '#555' }
    },
    y: {
      grid: { color: '#f3f4f6' },
      ticks: { color: '#555' }
    }
  }
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    todayRegistrations: 0,
    weeklyRegistrations: 0
  });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/dashboard/stats`);
        const { data } = response.data;
        
        setStats({
          totalUsers: data.totalUsers,
          activeUsers: data.activeUsers,
          todayRegistrations: data.todayRegistrations,
          weeklyRegistrations: data.weeklyRegistrations
        });

        // Process chart data
        const labels = data.dailySignups.map(item => 
          new Date(item._id).toLocaleDateString('en-US', { weekday: 'short' })
        );
        const values = data.dailySignups.map(item => item.count);

        setChartData({
          labels,
          datasets: [{
            label: 'Signups',
            data: values,
            fill: false,
            borderColor: '#2563eb',
            borderWidth: 2.5,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#2563eb'
          }]
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading dashboard data...</div>;
  }

  return (
    <>
      <h6 className="fw-semibold mb-3">Overview</h6>
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <div className="stat-card shadow-sm p-3">
            <p className="text-muted mb-1 small">Total Registered Users</p>
            <h3 className="fw-bold mb-1">{stats.totalUsers.toLocaleString()}</h3>
            <small className="text-secondary">All-time registrations</small>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card shadow-sm p-3">
            <p className="text-muted mb-1 small">Active Users</p>
            <h3 className="fw-bold mb-1">{stats.activeUsers.toLocaleString()}</h3>
            <small className="text-secondary">Active within last 30 days</small>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card shadow-sm p-3">
            <p className="text-muted mb-1 small">New Registrations</p>
            <h6 className="fw-semibold mb-1">
              Today: {stats.todayRegistrations} • Week: {stats.weeklyRegistrations} 
              <GraphUp size={16} className="ms-1" />
            </h6>
            <small className="text-secondary">Current period registrations</small>
          </div>
        </div>
      </div>
      <div className="chart-card shadow-sm p-4">
        <h6 className="fw-semibold mb-3">User Signups</h6>
        <div className="chart-bg p-3 rounded-4">
          {chartData && <Line data={chartData} options={options} height={80} />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;