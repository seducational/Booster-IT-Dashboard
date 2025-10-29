import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="dashboard-container d-flex flex-column flex-md-row">
      <Sidebar />
      <main className="main-content flex-grow-1 p-3 p-md-4">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;