// src/components/PartsTable.js
export default function PartsTable({ parts, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">Loading parts...</p>
      </div>
    );
  }

  if (parts.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="text-muted mb-3">
          <i className="fas fa-box-open fa-3x"></i>
        </div>
        <h5 className="text-dark">No parts found</h5>
        <p className="text-muted">Add your first part to get started</p>
      </div>
    );
  }

  const getStockBadge = (stock) => {
    if (stock === 0) return 'badge bg-danger';
    if (stock < 10) return 'badge bg-warning text-dark';
    return 'badge bg-success';
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">Part Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Category</th>
            <th scope="col" className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id}>
              <td>
                <div>
                  <div className="fw-semibold text-dark">{part.name}</div>
                  {part.description && (
                    <small className="text-muted text-truncate d-block" style={{maxWidth: '200px'}}>
                      {part.description}
                    </small>
                  )}
                </div>
              </td>
              <td className="align-middle">
                <span className="fw-medium">{part.brand}</span>
              </td>
              <td className="align-middle">
                <span className="fw-bold text-primary">${part.price}</span>
              </td>
              <td className="align-middle">
                <span className={getStockBadge(part.stock)}>
                  {part.stock} units
                </span>
              </td>
              <td className="align-middle">
                <span className="badge bg-secondary text-capitalize">
                  {part.category}
                </span>
              </td>
              <td className="align-middle text-center">
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => onEdit(part)}
                    title="Edit part"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(part.id)}
                    title="Delete part"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}