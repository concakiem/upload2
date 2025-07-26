'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Phone, X } from 'lucide-react';

export default function FloatPhoneButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  
  // Kiểm tra xem có nên hiển thị button hay không
  const shouldShow = pathname === '/' || pathname.startsWith('/products/');
  
  useEffect(() => {
    if (shouldShow) {
      // Delay hiển thị để có hiệu ứng mượt mà
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setShowPhone(false);
    }
  }, [shouldShow]);

  // Không render nếu không cần hiển thị
  if (!shouldShow) {
    return null;
  }

  const handleButtonClick = () => {
    console.log('Button clicked, current showPhone:', showPhone); // Debug log
    setShowPhone(!showPhone);
  };

  const handlePhoneCall = () => {
    window.open('tel:+84987654321', '_self');
  };

  const handleCloseCard = () => {
    setShowPhone(false);
  };

  return (
    <>
      {/* Overlay khi card mở */}
      {showPhone && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={handleCloseCard}
        />
      )}
      
      {/* Float Button Container */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        {/* Phone Number Card */}
        {showPhone && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-2xl border p-4 mb-2 w-64 z-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-800">Liên hệ hotline</span>
              </div>
              <button
                onClick={handleCloseCard}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center space-y-3">
              <div>
                <button
                  onClick={handlePhoneCall}
                  className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  098 765 4321
                </button>
                <p className="text-sm text-gray-500 mt-1">
                  Nhấn để gọi ngay
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">
                  <strong>Thời gian hoạt động:</strong><br />
                  7:00 - 21:00 (Thứ 2 - Chủ nhật)
                </p>
              </div>
              
              <button
                onClick={handlePhoneCall}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi ngay</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Float Button */}
        <button
          onClick={handleButtonClick}
          className={`w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative ${
            showPhone ? 'ring-4 ring-blue-200 scale-110' : ''
          }`}
        >
          <Phone className={`w-6 h-6 transition-transform duration-300 ${showPhone ? 'rotate-12' : ''}`} />
          
          {/* Pulse animation khi không mở card */}
          {!showPhone && (
            <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
          )}
        </button>
      </div>
    </>
  );
}