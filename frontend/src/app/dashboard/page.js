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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 text-sm">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <DashboardStats parts={parts} />

        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Parts Inventory</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            Add New Part
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <PartForm
            part={editingPart}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}

        {/* Parts Table */}
        <PartsTable
          parts={parts}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}