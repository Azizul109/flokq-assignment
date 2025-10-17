// src/components/PartCard.js
import Link from 'next/link';

export default function PartCard({ part }) {
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

  const getStockBadge = (stock) => {
    if (stock === 0) return 'badge bg-danger';
    if (stock < 10) return 'badge bg-warning text-dark';
    return 'badge bg-success';
  };

  const getStockText = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return `Low Stock (${stock})`;
    return `${stock} in stock`;
  };

  return (
    <div className="part-card card h-100">
      {/* Part Image */}
      {part.image_url ? (
        <img 
          src={part.image_url} 
          alt={part.name}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      ) : (
        <div 
          className="card-img-top bg-light d-flex align-items-center justify-content-center"
          style={{ height: '200px' }}
        >
          <i className="fas fa-image fa-3x text-muted"></i>
        </div>
      )}
      
      <div className="card-body d-flex flex-column">
        {/* Category and Stock Badges */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <span className={`category-badge badge ${getCategoryBadge(part.category)} text-uppercase`}>
            {part.category}
          </span>
          <span className={`stock-badge badge ${getStockBadge(part.stock)}`}>
            {getStockText(part.stock)}
          </span>
        </div>

        {/* Part Name and Brand */}
        <h5 className="card-title fw-bold text-dark mb-2">{part.name}</h5>
        <p className="text-muted mb-3">
          <i className="fas fa-tag me-1"></i>
          {part.brand}
        </p>

        {/* Price and Description */}
        <div className="mb-3">
          <div className="price-tag mb-2">${part.price}</div>
          {part.description && (
            <p className="card-text text-muted small">
              {part.description}
            </p>
          )}
        </div>

        {/* View Details Button */}
        <div className="mt-auto pt-3 border-top">
          <Link 
            href={`/parts/${part.id}`} 
            className="btn btn-outline-primary w-100"
          >
            <i className="fas fa-eye me-2"></i>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}