import React from 'react';
import { Bell } from 'react-bootstrap-icons';

const Navbar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <input
        type="text"
        className="search-bar"
        placeholder="Search users by name or email"
      />
      <div className="d-flex align-items-center gap-4">
        <Bell size={22} color="gray" />
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Admin"
            className="rounded-circle"
          />
          <span className="fw-semibold">Hi, Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;