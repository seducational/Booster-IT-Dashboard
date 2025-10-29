import React, { useState, useEffect } from 'react';
import { Search } from 'react-bootstrap-icons';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    dateFilter: '30days',
    sort: 'recent'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/dashboard/users`, {
        params: {
          page: pagination.currentPage,
          search: filters.search,
          status: filters.status,
          dateFilter: filters.dateFilter,
          sort: filters.sort
        }
      });
      
      setUsers(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, pagination.currentPage]);

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="users-page">
      <h5 className="fw-semibold mb-4">Registered Users</h5>

      <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
        <div className="position-relative flex-grow-1">
          <Search className="position-absolute top-50 translate-middle-y ms-3" size={16} color="#999" />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search email..."
            style={{ maxWidth: '300px' }}
            value={filters.search}
            onChange={handleSearch}
          />
        </div>

        <div className="d-flex gap-3">
          <select 
            className="form-select" 
            style={{ width: 'auto' }}
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select 
            className="form-select" 
            style={{ width: 'auto' }}
            name="dateFilter"
            value={filters.dateFilter}
            onChange={handleFilterChange}
          >
            <option value="30days">Date: Last 30 days</option>
            <option value="7days">Last 7 days</option>
            <option value="90days">Last 90 days</option>
          </select>

          <select 
            className="form-select" 
            style={{ width: 'auto' }}
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
          >
            <option value="recent">Sort: Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="fw-semibold">#</th>
                <th className="fw-semibold">Email</th>
                <th className="fw-semibold">Registration Date</th>
                <th className="fw-semibold">Status</th>
                <th className="fw-semibold">Plan</th>
                <th className="fw-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">Loading users data...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">No users found</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.registrationDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge rounded-pill ${user.status === 'Active' ? 'text-success bg-success-subtle' : 'text-secondary bg-secondary-subtle'}`}>
                        • {user.status}
                      </span>
                    </td>
                    <td>{user.plan}</td>
                    <td>
                      <button 
                        className="btn btn-light btn-sm px-3"
                        onClick={() => window.location.href = `/users/${user.id}`}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="text-muted small">
            Showing {users.length} of {pagination.total} users
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={pagination.currentPage === 1}
              onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;