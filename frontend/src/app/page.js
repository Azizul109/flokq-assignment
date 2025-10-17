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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🚗 AutoParts</h1>
              <nav className="ml-10 flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                  Home
                </Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Dashboard
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Quality Auto Parts
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Find the perfect parts for your vehicle. Browse our extensive inventory of quality auto parts from trusted brands.
            </p>
          </div>
        </div>
      </section>

      {/* Parts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Available Parts</h2>
          <span className="text-gray-600">{parts.length} parts available</span>
        </div>

        {parts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No parts available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {parts.map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 AutoParts Inventory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}