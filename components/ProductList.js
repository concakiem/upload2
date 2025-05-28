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
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 w-full">
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
                <Link
                  href={`/products/${product._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  Chi tiết
                </Link>
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