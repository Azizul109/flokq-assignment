import api from "@/lib/api";
import Link from "next/link";

async function getParts() {
  try {
    const response = await api.get("/parts");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching parts:", error);
    return [];
  }
}

export default async function PartsPage() {
  const parts = await getParts();

  const getCategoryBadge = (category) => {
    const colors = {
      filters: "bg-info",
      brakes: "bg-danger",
      ignition: "bg-warning",
      electrical: "bg-primary",
      engine: "bg-success",
      suspension: "bg-secondary",
      cooling: "bg-info",
      transmission: "bg-dark",
      accessories: "bg-secondary",
    };
    return colors[category] || "bg-secondary";
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", badge: "bg-danger" };
    if (stock < 10) return { text: "Low Stock", badge: "bg-warning text-dark" };
    return { text: "In Stock", badge: "bg-success" };
  };

  // Group parts by category for better organization
  const partsByCategory = parts.reduce((acc, part) => {
    if (!acc[part.category]) {
      acc[part.category] = [];
    }
    acc[part.category].push(part);
    return acc;
  }, {});

  const categories = Object.keys(partsByCategory);

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
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="display-4 fw-bold text-dark mb-2">
                  Auto Parts Catalog
                </h1>
                <p className="lead text-muted mb-0">
                  Browse our complete collection of high-quality auto parts
                </p>
              </div>
              <div className="text-end">
                <span className="badge bg-primary fs-6 p-3">
                  {parts.length} Total Parts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        {categories.length > 0 && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex flex-wrap gap-2">
                <a href="#all" className="btn btn-outline-primary btn-sm">
                  All Parts
                </a>
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`#${category}`}
                    className="btn btn-outline-secondary btn-sm text-capitalize"
                  >
                    {category} ({partsByCategory[category].length})
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {parts.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-box-open fa-4x text-muted mb-3"></i>
            <h3 className="text-muted">No parts found</h3>
            <p className="text-muted">Check back later for new inventory.</p>
          </div>
        ) : (
          <>
            {/* All Parts Grid View */}
            <div className="row mb-5" id="all">
              <div className="col-12">
                <h2 className="fw-bold mb-4 text-primary">
                  <i className="fas fa-th-large me-2"></i>
                  All Parts
                </h2>
                <div className="row g-4">
                  {parts.map((part) => {
                    const stockStatus = getStockStatus(part.stock);
                    return (
                      <div key={part.id} className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card h-100 shadow-sm border-0"
                          style={{ transition: "all 0.3s ease" }}
                        >
                          <div
                            className="card-img-top bg-light d-flex align-items-center justify-content-center position-relative"
                            style={{ height: "200px" }}
                          >
                            {part.image_url ? (
                              <img
                                src={part.image_url}
                                alt={part.name}
                                className="img-fluid"
                                style={{
                                  maxHeight: "100%",
                                  maxWidth: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div className="text-center text-muted">
                                <i className="fas fa-image fa-3x mb-2"></i>
                                <p className="small">No Image</p>
                              </div>
                            )}
                            <span
                              className={`badge position-absolute top-0 end-0 m-2 ${stockStatus.badge}`}
                            >
                              {stockStatus.text}
                            </span>
                          </div>

                          <div className="card-body d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <span
                                className={`badge ${getCategoryBadge(
                                  part.category
                                )} text-uppercase`}
                              >
                                {part.category}
                              </span>
                              <small className="text-muted">#{part.id}</small>
                            </div>

                            <h5 className="card-title fw-bold text-dark mb-2">
                              {part.name}
                            </h5>
                            <p className="card-text text-muted small mb-2">
                              <i className="fas fa-industry me-1"></i>
                              {part.brand}
                            </p>

                            {part.description && (
                              <p className="card-text text-muted small flex-grow-1">
                                {part.description.length > 80
                                  ? `${part.description.substring(0, 80)}...`
                                  : part.description}
                              </p>
                            )}

                            <div className="mt-auto">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-primary fw-bold mb-0">
                                  ${part.price}
                                </h4>
                                <small
                                  className={`text-${
                                    part.stock === 0
                                      ? "danger"
                                      : part.stock < 10
                                      ? "warning"
                                      : "muted"
                                  }`}
                                >
                                  {part.stock} in stock
                                </small>
                              </div>

                              <div className="d-grid gap-2">
                                <Link
                                  href={`/parts/${part.id}`}
                                  className="btn btn-primary btn-sm"
                                >
                                  <i className="fas fa-eye me-1"></i>
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Category-wise Sections */}
            {categories.map((category) => (
              <div key={category} className="row mb-5" id={category}>
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold text-primary text-capitalize">
                      <i className="fas fa-tag me-2"></i>
                      {category} Parts
                    </h2>
                    <span className="badge bg-secondary fs-6">
                      {partsByCategory[category].length} items
                    </span>
                  </div>
                  <div className="row g-4">
                    {partsByCategory[category].map((part) => {
                      const stockStatus = getStockStatus(part.stock);
                      return (
                        <div
                          key={part.id}
                          className="col-md-6 col-lg-4 col-xl-3"
                        >
                          <div
                            className="card h-100 shadow-sm border-0"
                            style={{ transition: "all 0.3s ease" }}
                          >
                            <div
                              className="card-img-top bg-light d-flex align-items-center justify-content-center position-relative"
                              style={{ height: "180px" }}
                            >
                              {part.image_url ? (
                                <img
                                  src={part.image_url}
                                  alt={part.name}
                                  className="img-fluid"
                                  style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <div className="text-center text-muted">
                                  <i className="fas fa-image fa-2x mb-2"></i>
                                  <p className="small">No Image</p>
                                </div>
                              )}
                              <span
                                className={`badge position-absolute top-0 end-0 m-2 ${stockStatus.badge}`}
                              >
                                {stockStatus.text}
                              </span>
                            </div>

                            <div className="card-body d-flex flex-column">
                              <h6 className="card-title fw-bold text-dark mb-2">
                                {part.name}
                              </h6>
                              <p className="card-text text-muted small mb-2">
                                <i className="fas fa-industry me-1"></i>
                                {part.brand}
                              </p>

                              <div className="mt-auto">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <h5 className="text-primary fw-bold mb-0">
                                    ${part.price}
                                  </h5>
                                  <small className="text-muted">
                                    {part.stock} left
                                  </small>
                                </div>

                                <div className="d-grid">
                                  <Link
                                    href={`/parts/${part.id}`}
                                    className="btn btn-outline-primary btn-sm"
                                  >
                                    View Details
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
