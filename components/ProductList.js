'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ProductList({ initialProducts }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [isDeleting, setIsDeleting] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        setIsDeleting(id);
        await axios.delete(`/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
        router.refresh();
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        alert('Có lỗi xảy ra khi xóa sản phẩm');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const handleDetailClick = (productId) => {
    setLoadingProductId(productId);
    // Sử dụng setTimeout để đảm bảo loading state được hiển thị trước khi navigate
    setTimeout(() => {
      router.push(`/products/${productId}`);
    }, 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          Không có sản phẩm nào. Hãy thêm sản phẩm mới!
        </p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className={`border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
              loadingProductId === product._id ? 'opacity-60 scale-95' : ''
            }`}
          >
            {/* Clickable Image */}
            <div 
              className="relative h-48 w-full cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleDetailClick(product._id)}
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
              <div className="flex justify-between">
                <button
                  onClick={() => handleDetailClick(product._id)}
                  disabled={loadingProductId === product._id}
                  className={`bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1 ${
                    loadingProductId === product._id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loadingProductId === product._id ? (
                    <>
                      <svg 
                        className="animate-spin h-3 w-3" 
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
                      <span className="text-xs">Đang tải...</span>
                    </>
                  ) : (
                    <span>Chi tiết</span>
                  )}
                </button>
                <div className="space-x-2">
                  <Link
                    href={`/products/${product._id}/edit`}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={isDeleting === product._id}
                    className={`bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 ${
                      isDeleting === product._id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isDeleting === product._id ? 'Đang xóa...' : 'Xóa'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}