'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

export default function ProductForm({ product }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(product?.imageUrl || '');
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || 'Điện tử',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file hình ảnh');
      return;
    }

    // Tạo đối tượng URL cho file được chọn để hiển thị preview
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Tạo FormData để gửi cả dữ liệu và file
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      submitData.append('category', formData.category);
      
      // Thêm file nếu có chọn file mới
      if (fileInputRef.current && fileInputRef.current.files[0]) {
        submitData.append('image', fileInputRef.current.files[0]);
      } else if (product?.imageUrl) {
        // Nếu đang cập nhật và không có file mới, giữ nguyên URL cũ
        submitData.append('imageUrl', product.imageUrl);
      } else {
        setError('Vui lòng chọn hình ảnh sản phẩm');
        setIsSubmitting(false);
        return;
      }
      
      if (product) {
        // Cập nhật sản phẩm
        await axios.put(`/api/products/${product._id}`, submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Thêm sản phẩm mới
        await axios.post('/api/products', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      router.push('/products');
      router.refresh();
    } catch (error) {
      setError(error.response?.data?.message || 'Đã xảy ra lỗi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Tên sản phẩm
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Mô tả
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Giá
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hình ảnh sản phẩm
        </label>
        
        <div className="flex items-center space-x-4">
          <input
            type="file"
            id="image"
            name="image"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0 file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          
          {product && !fileInputRef.current?.files[0] && (
            <span className="text-sm text-gray-500">
              Để trống nếu muốn giữ nguyên ảnh cũ
            </span>
          )}
        </div>
        
        {imagePreview && (
          <div className="mt-4 relative h-48 w-full lg:w-1/2 border rounded-md overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="object-contain w-full h-full"
            />
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Danh mục
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="Điện tử">Điện tử</option>
          <option value="Thời trang">Thời trang</option>
          <option value="Đồ gia dụng">Đồ gia dụng</option>
          <option value="Thực phẩm">Thực phẩm</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Đang xử lý...' : product ? 'Cập nhật' : 'Thêm mới'}
        </button>
        
        <button
          type="button"
          onClick={() => router.push('/products')}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}