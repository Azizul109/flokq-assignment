// src/app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import DashboardStats from '@/components/DashboardStats';
import PartForm from '@/components/PartForm';
import PartsTable from '@/components/PartsTable';

export default function Dashboard() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchParts();
  }, [isAuthenticated, router]);

  const fetchParts = async () => {
    try {
      const response = await api.get('/parts');
      setParts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (part) => {
    setEditingPart(part);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this part?')) return;

    try {
      await api.delete(`/parts/${id}`);
      fetchParts(); // Refresh the list
    } catch (error) {
      console.error('Error deleting part:', error);
      alert('Failed to delete part');
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingPart(null);
    fetchParts(); // Refresh the list
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPart(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <i className="fas fa-car me-2"></i>
            <span className="fw-bold">AutoParts</span>
            <span className="text-warning fw-bold">Pro</span>
          </a>
          
          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-user-circle me-2"></i>
                {user?.name}
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i>Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={logout}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="h2 fw-bold text-dark mb-1">
                  <i className="fas fa-tachometer-alt me-2 text-primary"></i>
                  Dashboard
                </h1>
                <p className="text-muted mb-0">Welcome back, {user?.name}</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary"
              >
                <i className="fas fa-plus me-2"></i>
                Add New Part
              </button>
            </div>

            {/* Stats Cards */}
            <DashboardStats parts={parts} />

            {/* Add/Edit Form */}
            {showForm && (
              <div className="row mb-4">
                <div className="col-12">
                  <PartForm
                    part={editingPart}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                  />
                </div>
              </div>
            )}

            {/* Parts Table */}
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="card-title mb-0">
                  <i className="fas fa-list me-2 text-primary"></i>
                  Parts Inventory
                </h5>
              </div>
              <div className="card-body">
                <PartsTable
                  parts={parts}
                  loading={loading}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}