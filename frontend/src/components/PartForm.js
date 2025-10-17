// src/components/PartForm.js
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function PartForm({ part, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (part) {
      setFormData({
        name: part.name || '',
        brand: part.brand || '',
        price: part.price || '',
        stock: part.stock || '',
        category: part.category || '',
        description: part.description || '',
        image_url: part.image_url || ''
      });
    }
  }, [part]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };

      if (part) {
        await api.put(`/parts/${part.id}`, data);
      } else {
        await api.post('/parts', data);
      }

      onSubmit();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save part');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {part ? 'Edit Part' : 'Add New Part'}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Part Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter part name"
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            Brand *
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            required
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter brand"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock *
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            required
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            <option value="engine">Engine</option>
            <option value="brakes">Brakes</option>
            <option value="suspension">Suspension</option>
            <option value="electrical">Electrical</option>
            <option value="filters">Filters</option>
            <option value="ignition">Ignition</option>
            <option value="exhaust">Exhaust</option>
            <option value="cooling">Cooling</option>
            <option value="transmission">Transmission</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter part description"
          />
        </div>

        <div className="md:col-span-2 flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : (part ? 'Update Part' : 'Add Part')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}