import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, People, BoxArrowRight } from 'react-bootstrap-icons';

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <div className="d-flex align-items-center gap-2 mb-5 p-4">
        <Grid size={22} color="#2563eb" />
        <h5 className="mb-0 fw-semibold">Admin Console</h5>
      </div>

      <div className="px-3 d-flex flex-column">
        <Link to="/" className={`side-btn w-100 text-decoration-none ${location.pathname === '/' ? 'active' : ''}`}>
          <Grid size={18} className="me-2" /> Dashboard Overview
        </Link>
        <Link to="/users" className={`side-btn w-100 text-decoration-none ${location.pathname === '/users' ? 'active' : ''}`}>
          <People size={18} className="me-2" /> Registered Users
        </Link>
        <button className="side-btn w-100 mt-auto">
          <BoxArrowRight size={18} className="me-2" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;