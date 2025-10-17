// src/app/parts/[id]/page.js
import api from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getPart(id) {
  try {
    const response = await api.get(`/parts/${id}`);
    return response.data.data || null;
  } catch (error) {
    console.error("Error fetching part:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const response = await api.get("/parts");
    const parts = response.data.data || [];

    return parts.map((part) => ({
      id: part.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function PartDetail({ params }) {
  const part = await getPart(params.id);

  if (!part) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600"
            >
              🚗 AutoParts
            </Link>
            <nav className="flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                ← Back to Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Part Details */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Part Image Placeholder */}
              <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">🚗</div>
                  <p>Part Image</p>
                </div>
              </div>

              {/* Part Details */}
              <div>
                <div className="mb-6">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full capitalize">
                    {part.category}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {part.name}
                </h1>
                <p className="text-xl text-gray-600 mb-6">{part.brand}</p>

                <div className="mb-6">
                  <p className="text-4xl font-bold text-blue-600">
                    ${part.price}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-24">
                      Stock:
                    </span>
                    <span
                      className={`font-medium ${
                        part.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {part.stock > 0
                        ? `${part.stock} units available`
                        : "Out of stock"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-24">
                      Category:
                    </span>
                    <span className="text-gray-600 capitalize">
                      {part.category}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-24">
                      Brand:
                    </span>
                    <span className="text-gray-600">{part.brand}</span>
                  </div>
                </div>

                {part.description && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {part.description}
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    disabled={part.stock === 0}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium text-center ${
                      part.stock > 0
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {part.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
