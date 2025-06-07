'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

export default function ProductForm({ product }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDelete = async () => {
    if (!product) return;
    
    const confirmDelete = confirm(
      `Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?\n\nHành động này không thể hoàn tác!`
    );
    
    if (!confirmDelete) return;

    setIsDeleting(true);
    setError('');

    try {
      await axios.delete(`/api/products/${product._id}`);
      
      // Thông báo thành công và chuyển hướng
      alert('Đã xóa sản phẩm thành công!');
      router.push('/products');
      router.refresh();
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      setError(error.response?.data?.message || 'Có lỗi xảy ra khi xóa sản phẩm');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Hiển thị thông tin sản phẩm khi đang chỉnh sửa */}
      {product && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">
            Đang chỉnh sửa sản phẩm
          </h2>
          <div className="flex items-center space-x-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-medium text-blue-700">{product.name}</p>
              <p className="text-sm text-blue-600">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.price)}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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
        
        <div className="flex gap-4 pt-4">
          {/* Nút Submit */}
          <button
            type="submit"
            disabled={isSubmitting || isDeleting}
            className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${
              isSubmitting || isDeleting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Đang xử lý...' : product ? 'Cập nhật' : 'Thêm mới'}
          </button>
          
          {/* Nút Xóa - chỉ hiện khi đang chỉnh sửa */}
          {product && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting || isDeleting}
              className={`bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center gap-2 ${
                isSubmitting || isDeleting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xóa...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Xóa sản phẩm
                </>
              )}
            </button>
          )}
          
          {/* Nút Hủy */}
          <button
            type="button"
            onClick={() => router.push('/products')}
            disabled={isSubmitting || isDeleting}
            className={`bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 ${
              isSubmitting || isDeleting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Hủy
          </button>
        </div>
      </form>

      {/* Cảnh báo về việc xóa sản phẩm */}
      {product && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Lưu ý khi xóa sản phẩm
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Khi xóa sản phẩm, tất cả thông tin liên quan sẽ bị mất vĩnh viễn và không thể khôi phục. 
                Hãy chắc chắn rằng bạn muốn thực hiện hành động này.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}