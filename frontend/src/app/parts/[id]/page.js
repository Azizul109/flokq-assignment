// src/app/parts/[id]/page.js
import api from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getPart(id) {
  try {
    const response = await api.get(`/parts/${id}`);
    return response.data.data || null;
  } catch (error) {
    console.error('Error fetching part:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const response = await api.get('/parts');
    const parts = response.data.data || [];
    
    return parts.map((part) => ({
      id: part.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function PartDetail({ params }) {
  const { id } = await params;
  const part = await getPart(id);

  if (!part) {
    notFound();
  }

  const getCategoryBadge = (category) => {
    const colors = {
      filters: 'bg-info',
      brakes: 'bg-danger',
      ignition: 'bg-warning',
      electrical: 'bg-primary',
      engine: 'bg-success',
      suspension: 'bg-secondary',
      cooling: 'bg-info',
      transmission: 'bg-dark',
      accessories: 'bg-secondary',
    };
    return colors[category] || 'bg-secondary';
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return { text: 'Out of Stock', class: 'text-danger', badge: 'bg-danger' };
    } else if (stock < 10) {
      return { text: 'Low Stock', class: 'text-warning', badge: 'bg-warning text-dark' };
    } else {
      return { text: 'In Stock', class: 'text-success', badge: 'bg-success' };
    }
  };

  const stockStatus = getStockStatus(part.stock);

  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" href="/">
            <i className="fas fa-car me-2 text-primary"></i>
            <span className="fw-bold">AutoParts</span>
            <span className="text-primary fw-bold">Pro</span>
          </Link>
          
          <div className="navbar-nav ms-auto">
            <Link href="/" className="nav-link">
              <i className="fas fa-arrow-left me-1"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-4">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/" className="text-decoration-none">
                        <i className="fas fa-home me-1"></i>
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/parts" className="text-decoration-none">
                        Parts
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">{part.name}</li>
                  </ol>
                </nav>

                <div className="row">
                  {/* Part Image */}
                  <div className="col-md-6 mb-4 mb-md-0">
                    <div className="bg-light rounded-3 d-flex align-items-center justify-content-center" style={{height: '400px'}}>
                      {part.image_url ? (
                        <img 
                          src={part.image_url} 
                          alt={part.name}
                          className="img-fluid rounded-3"
                          style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'cover'}}
                        />
                      ) : (
                        <div className="text-center text-muted">
                          <i className="fas fa-image fa-5x mb-3"></i>
                          <p>No Image Available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Part Details */}
                  <div className="col-md-6">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className={`badge ${getCategoryBadge(part.category)} text-uppercase fs-6`}>
                        {part.category}
                      </span>
                      <span className={`badge ${stockStatus.badge} fs-6`}>
                        {stockStatus.text}
                      </span>
                    </div>

                    <h1 className="display-5 fw-bold text-dark mb-3">{part.name}</h1>
                    <p className="lead text-muted mb-4">
                      <i className="fas fa-industry me-2"></i>
                      {part.brand}
                    </p>

                    <div className="mb-4">
                      <h2 className="text-primary fw-bold display-4 mb-2">${part.price}</h2>
                      <p className="text-muted">per unit</p>
                    </div>

                    <div className="mb-4">
                      <h5 className="fw-bold mb-3">
                        <i className="fas fa-info-circle me-2 text-primary"></i>
                        Product Details
                      </h5>
                      <div className="row g-3">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-boxes me-2 text-muted"></i>
                            <div>
                              <small className="text-muted d-block">Stock</small>
                              <strong className={stockStatus.class}>{part.stock} units</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-tags me-2 text-muted"></i>
                            <div>
                              <small className="text-muted d-block">Category</small>
                              <strong className="text-capitalize">{part.category}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-industry me-2 text-muted"></i>
                            <div>
                              <small className="text-muted d-block">Brand</small>
                              <strong>{part.brand}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {part.description && (
                      <div className="mb-4">
                        <h5 className="fw-bold mb-3">
                          <i className="fas fa-align-left me-2 text-primary"></i>
                          Description
                        </h5>
                        <p className="text-muted lead">{part.description}</p>
                      </div>
                    )}

                    <div className="d-grid gap-2 d-md-flex">
                      <button 
                        className={`btn btn-primary btn-lg flex-fill ${part.stock === 0 ? 'disabled' : ''}`}
                        disabled={part.stock === 0}
                      >
                        <i className="fas fa-cart-plus me-2"></i>
                        {part.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button className="btn btn-outline-secondary btn-lg">
                        <i className="fas fa-heart me-2"></i>
                        Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}