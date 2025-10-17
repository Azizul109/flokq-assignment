// src/components/PartCard.js
import Link from 'next/link';

export default function PartCard({ part }) {
  return (
    <Link href={`/parts/${part.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{part.name}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
              {part.category}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3">{part.brand}</p>
          
          <div className="flex justify-between items-center mb-3">
            <p className="text-2xl font-bold text-blue-600">${part.price}</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              part.stock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {part.stock > 0 ? `${part.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {part.description && (
            <p className="text-gray-500 text-sm line-clamp-2 mt-2">
              {part.description}
            </p>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100">
            <span className="text-blue-600 text-sm font-medium hover:text-blue-700">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}