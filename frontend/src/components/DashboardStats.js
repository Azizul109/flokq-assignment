// src/components/DashboardStats.js
export default function DashboardStats({ parts }) {
  const stats = {
    totalParts: parts.length,
    totalStock: parts.reduce((sum, part) => sum + part.stock, 0),
    categories: new Set(parts.map(part => part.category)).size,
    totalValue: parts.reduce((sum, part) => sum + (parseFloat(part.price) * part.stock), 0),
    outOfStock: parts.filter(part => part.stock === 0).length,
    lowStock: parts.filter(part => part.stock > 0 && part.stock < 10).length,
  };

  const statCards = [
    {
      title: 'Total Parts',
      value: stats.totalParts,
      color: 'primary',
      icon: 'fas fa-boxes',
      description: 'Unique part types'
    },
    {
      title: 'Total Stock',
      value: stats.totalStock,
      color: 'success',
      icon: 'fas fa-layer-group',
      description: 'Units available'
    },
    {
      title: 'Categories',
      value: stats.categories,
      color: 'info',
      icon: 'fas fa-tags',
      description: 'Product categories'
    },
    {
      title: 'Inventory Value',
      value: `$${stats.totalValue.toFixed(2)}`,
      color: 'warning',
      icon: 'fas fa-dollar-sign',
      description: 'Total stock value'
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStock,
      color: 'danger',
      icon: 'fas fa-exclamation-triangle',
      description: 'Items needing restock'
    },
    {
      title: 'Low Stock',
      value: stats.lowStock,
      color: 'warning',
      icon: 'fas fa-thermometer-half',
      description: 'Items below 10 units'
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {statCards.map((stat, index) => (
        <div key={index} className="col-sm-6 col-lg-4 col-xl-2">
          <div className={`card border-${stat.color} border-top-0 border-end-0 border-bottom-0 border-4 h-100`}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h6 className="card-title text-muted mb-1">{stat.title}</h6>
                  <h4 className="fw-bold text-dark mb-1">{stat.value}</h4>
                  <small className="text-muted">{stat.description}</small>
                </div>
                <div className={`text-${stat.color} fs-2`}>
                  <i className={stat.icon}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}