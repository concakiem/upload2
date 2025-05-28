'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomeProductList({ products }) {
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
          className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <Link href={`/products/${product._id}`}>
            <div className="relative h-48 w-full cursor-pointer hover:opacity-90 transition-opacity">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </Link>
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
              <Link
                href={`/products/${product._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}