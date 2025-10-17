// src/components/DashboardStats.js
export default function DashboardStats({ parts }) {
    const stats = {
      totalParts: parts.length,
      totalStock: parts.reduce((sum, part) => sum + part.stock, 0),
      categories: new Set(parts.map(part => part.category)).size,
      totalValue: parts.reduce((sum, part) => sum + (part.price * part.stock), 0),
      outOfStock: parts.filter(part => part.stock === 0).length,
    };
  
    const statCards = [
      {
        title: 'Total Parts',
        value: stats.totalParts,
        color: 'blue',
        icon: '📦',
      },
      {
        title: 'Total Stock',
        value: stats.totalStock,
        color: 'green',
        icon: '🔢',
      },
      {
        title: 'Categories',
        value: stats.categories,
        color: 'purple',
        icon: '📊',
      },
      {
        title: 'Inventory Value',
        value: `$${stats.totalValue.toFixed(2)}`,
        color: 'orange',
        icon: '💰',
      },
      {
        title: 'Out of Stock',
        value: stats.outOfStock,
        color: 'red',
        icon: '⚠️',
      },
    ];
  
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600',
      red: 'bg-red-50 text-red-600',
    };
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${colorClasses[stat.color]}`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }