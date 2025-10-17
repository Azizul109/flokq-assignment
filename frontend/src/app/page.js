// src/app/page.js
import api from '@/lib/api';
import Link from 'next/link';
import PartCard from '@/components/PartCard';

async function getParts() {
  try {
    const response = await api.get('/parts');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching parts:', error);
    return [];
  }
}

export default async function Home() {
  const parts = await getParts();

  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" href="/">
            <i className="fas fa-car me-2 text-primary"></i>
            <span className="fw-bold">AutoParts</span>
            <span className="text-primary fw-bold">Pro</span>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" href="/">
                  <i className="fas fa-home me-1"></i>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard">
                  <i className="fas fa-chart-bar me-1"></i>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/parts">
                  <i className="fas fa-tools me-1"></i>
                  All Parts
                </Link>
              </li>
            </ul>
            
            <div className="d-flex">
              <Link href="/login" className="btn btn-outline-primary me-2">
                <i className="fas fa-sign-in-alt me-1"></i>
                Sign In
              </Link>
              <Link href="/register" className="btn btn-primary">
                <i className="fas fa-user-plus me-1"></i>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Premium Auto Parts
                <span className="d-block text-warning">For Your Vehicle</span>
              </h1>
              <p className="lead mb-4">
                Discover quality parts from trusted brands. Keep your vehicle running smoothly 
                with our extensive inventory and expert support.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link href="/parts" className="btn btn-warning btn-lg fw-bold">
                  <i className="fas fa-tools me-2"></i>
                  Browse Parts
                </Link>
                <Link href="/dashboard" className="btn btn-outline-light btn-lg">
                  <i className="fas fa-chart-bar me-2"></i>
                  Manage Inventory
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="hero-image mt-5 mt-lg-0">
                <i className="fas fa-car-side display-1 text-warning"></i>
                <i className="fas fa-wrench display-1 text-light mx-4"></i>
                <i className="fas fa-cog display-1 text-warning"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">
              Why Choose AutoParts Pro?
            </h2>
            <p className="lead text-muted">
              We provide the best auto parts with exceptional service and support
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card card h-100 text-center p-4">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-shipping-fast fa-3x text-primary"></i>
                  </div>
                  <h4 className="card-title fw-bold">Fast Delivery</h4>
                  <p className="card-text text-muted">
                    Quick shipping to get your parts when you need them most
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="feature-card card h-100 text-center p-4">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-check-circle fa-3x text-success"></i>
                  </div>
                  <h4 className="card-title fw-bold">Quality Guaranteed</h4>
                  <p className="card-text text-muted">
                    All parts are tested and verified for optimal performance
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="feature-card card h-100 text-center p-4">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-headset fa-3x text-info"></i>
                  </div>
                  <h4 className="card-title fw-bold">Expert Support</h4>
                  <p className="card-text text-muted">
                    Professional advice and customer service when you need it
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parts Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5">
            <div>
              <h2 className="display-6 fw-bold text-dark mb-2">Featured Parts</h2>
              <p className="text-muted mb-0">Top-quality parts for your maintenance needs</p>
            </div>
            <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
              <span className="badge bg-primary fs-6">
                {parts.length} parts available
              </span>
              <Link href="/parts" className="btn btn-outline-primary">
                View All <i className="fas fa-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>

          {parts.length === 0 ? (
            <div className="text-center py-5">
              <div className="empty-state">
                <i className="fas fa-tools fa-4x text-muted mb-3"></i>
                <h4 className="text-dark">No Parts Available</h4>
                <p className="text-muted">Check back later for new inventory</p>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {parts.slice(0, 4).map((part) => (
                <div key={part.id} className="col-sm-6 col-lg-3">
                  <PartCard part={part} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Join thousands of satisfied customers who trust AutoParts Pro for their vehicle needs.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link href="/register" className="btn btn-warning btn-lg fw-bold">
              <i className="fas fa-user-plus me-2"></i>
              Create Account
            </Link>
            <Link href="/login" className="btn btn-outline-light btn-lg">
              <i className="fas fa-sign-in-alt me-2"></i>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-car fa-2x text-primary me-2"></i>
                <span className="fw-bold fs-4">AutoParts Pro</span>
              </div>
              <p className="text-light">
                Your trusted partner for quality auto parts and exceptional service.
              </p>
            </div>
            
            <div className="col-lg-3">
              <h5 className="text-warning mb-3">Products</h5>
              <ul className="list-unstyled">
                <li><Link href="/parts" className="text-light text-decoration-none">All Parts</Link></li>
                <li><Link href="/parts?category=engine" className="text-light text-decoration-none">Engine Parts</Link></li>
                <li><Link href="/parts?category=brakes" className="text-light text-decoration-none">Brakes</Link></li>
                <li><Link href="/parts?category=electrical" className="text-light text-decoration-none">Electrical</Link></li>
              </ul>
            </div>
            
            <div className="col-lg-3">
              <h5 className="text-warning mb-3">Company</h5>
              <ul className="list-unstyled">
                <li><Link href="/about" className="text-light text-decoration-none">About Us</Link></li>
                <li><Link href="/contact" className="text-light text-decoration-none">Contact</Link></li>
                <li><Link href="/support" className="text-light text-decoration-none">Support</Link></li>
              </ul>
            </div>
            
            <div className="col-lg-3">
              <h5 className="text-warning mb-3">Account</h5>
              <ul className="list-unstyled">
                <li><Link href="/login" className="text-light text-decoration-none">Sign In</Link></li>
                <li><Link href="/register" className="text-light text-decoration-none">Create Account</Link></li>
                <li><Link href="/dashboard" className="text-light text-decoration-none">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          
          <hr className="my-4 border-light" />
          
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="text-light mb-2 mb-md-0">
              © 2024 AutoParts Pro. All rights reserved.
            </p>
            <div className="d-flex gap-4">
              <a href="#" className="text-light text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-light text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}