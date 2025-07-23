'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomeProductList({ products }) {
  const router = useRouter();
  const [loadingProductId, setLoadingProductId] = useState(null);

  const handleProductClick = (productId) => {
    setLoadingProductId(productId);
    // Sử dụng setTimeout để đảm bảo loading state được hiển thị trước khi navigate
    setTimeout(() => {
      router.push(`/products/${productId}`);
    }, 100);
  };

  if (!products || products.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-500">
        Không có sản phẩm nào để hiển thị.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className={`border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
            loadingProductId === product._id ? 'opacity-60 scale-95' : ''
          }`}
        >
          {/* Clickable Image */}
          <div 
            className="relative h-48 w-full cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleProductClick(product._id)}
          >
            {loadingProductId === product._id && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
                <div className="flex flex-col items-center text-white">
                  <svg 
                    className="animate-spin h-8 w-8 mb-2" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Đang tải...</span>
                </div>
              </div>
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            <p className="text-blue-600 font-bold mb-2">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(product.price)}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Danh mục: {product.category}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => handleProductClick(product._id)}
                disabled={loadingProductId === product._id}
                className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 ${
                  loadingProductId === product._id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loadingProductId === product._id ? (
                  <>
                    <svg 
                      className="animate-spin h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Đang tải...</span>
                  </>
                ) : (
                  <span>Xem chi tiết</span>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}