'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ product }) {
    const router = useRouter();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual order processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Đơn hàng:', {
        product: {
          id: product._id,
          name: product.name,
          price: product.price
        },
        customer: orderForm
      });
      
      setOrderSuccess(true);
      
      
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setShowOrderModal(false);
      setOrderSuccess(false);
    }
  };

  const handleSuccessClose = () => {
    setShowOrderModal(false);
    setOrderSuccess(false);
    setOrderForm({
      fullName: '',
      phoneNumber: '',
      address: '',
      note: ''
    });
    router.push('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/products" className="text-blue-600 hover:underline">
          &larr; Quay lại danh sách
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-80 w-full rounded-lg overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-contain w-full h-full"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-bold mb-4">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(product.price)}
          </p>
          
          <div className="mb-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {product.category}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Mô tả sản phẩm</h2>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{product.description}</p>
          
          <p className="text-sm text-gray-500 mb-6">
            Ngày tạo: {product.createdAt}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowOrderModal(true)}
              className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 font-semibold"
            >
              Mua ngay
            </button>
            
            <Link
              href={`/products/${product._id}/edit`}
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 text-center"
            >
              Chỉnh sửa
            </Link>
            
            <Link
              href="/products"
              className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 text-center"
            >
              Quay lại
            </Link>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            {!orderSuccess ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Thông tin đặt hàng</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Product Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-blue-600 font-bold">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(product.price)}
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={orderForm.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập họ và tên"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={orderForm.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập số điện thoại"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ giao hàng *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={orderForm.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập địa chỉ giao hàng chi tiết"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                      Ghi chú (tùy chọn)
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={orderForm.note}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ghi chú thêm cho đơn hàng"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-semibold ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={isSubmitting}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-600 mb-2">Đặt hàng thành công!</h3>
                <p className="text-gray-600 mb-4">
                  Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
                </p>
                <button
                  onClick={handleSuccessClose}
                  className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 font-semibold"
                >
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}