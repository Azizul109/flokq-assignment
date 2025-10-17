// src/components/PartForm.js
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function PartForm({ part, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (part) {
      setFormData({
        name: part.name || "",
        brand: part.brand || "",
        price: part.price || "",
        stock: part.stock || "",
        category: part.category || "",
        description: part.description || "",
      });
      if (part.image_url) {
        setImagePreview(part.image_url);
      }
    }
  }, [part]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const submitData = new FormData();

      // Append form data
      submitData.append("name", formData.name);
      submitData.append("brand", formData.brand);
      submitData.append("price", formData.price);
      submitData.append("stock", formData.stock);
      submitData.append("category", formData.category);
      submitData.append("description", formData.description);

      // Append image if selected
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      let response;
      if (part) {
        response = await api.put(`/parts/${part.id}`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await api.post("/parts", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      onSubmit();
    } catch (error) {
      setError(error.response?.data?.error || "Failed to save part");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h5 className="card-title mb-0">
          <i className="fas fa-edit me-2 text-primary"></i>
          {part ? "Edit Part" : "Add New Part"}
        </h5>
      </div>
      <div className="card-body">
        {error && (
          <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Image Upload Section */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                <i className="fas fa-image me-2 text-primary"></i>
                Part Image
              </label>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-3">
                  <div className="position-relative d-inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={removeImage}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* File Input */}
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="form-text">
                Upload a product image (JPG, PNG, GIF). Max size: 5MB.
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="name" className="form-label fw-semibold">
                <i className="fas fa-tag me-2 text-primary"></i>
                Part Name *
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter part name"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="brand" className="form-label fw-semibold">
                <i className="fas fa-industry me-2 text-primary"></i>
                Brand *
              </label>
              <input
                type="text"
                className="form-control"
                id="brand"
                name="brand"
                required
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="price" className="form-label fw-semibold">
                <i className="fas fa-dollar-sign me-2 text-primary"></i>
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="price"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="stock" className="form-label fw-semibold">
                <i className="fas fa-boxes me-2 text-primary"></i>
                Stock *
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                required
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="category" className="form-label fw-semibold">
                <i className="fas fa-tags me-2 text-primary"></i>
                Category *
              </label>
              <select
                className="form-select"
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
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

            <div className="col-12">
              <label htmlFor="description" className="form-label fw-semibold">
                <i className="fas fa-align-left me-2 text-primary"></i>
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter part description"
              />
            </div>

            <div className="col-12">
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      {part ? "Update Part" : "Add Part"}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn btn-outline-secondary"
                >
                  <i className="fas fa-times me-2"></i>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
