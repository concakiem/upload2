'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Phone, X } from 'lucide-react';

export default function FloatPhoneButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
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
      setIsExpanded(false);
    }
  }, [shouldShow]);

  // Không render nếu không cần hiển thị
  if (!shouldShow) {
    return null;
  }

  const handleCall = () => {
    window.open('tel:+84987654321', '_self');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Overlay khi expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
      
      {/* Float Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        {/* Phone Number Display - Click to expand */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border p-3 mb-2 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Hotline</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            
            <div className="text-center">
              <a 
                href="tel:+84987654321"
                className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                098 765 4321
              </a>
              <p className="text-xs text-gray-500 mt-1">
                7:00 - 21:00 (T2-CN)
              </p>
            </div>
          </div>
        )}

        {/* Main Float Button */}
        <div className="relative group">
          <button
            onClick={toggleExpanded}
            className={`w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
              isExpanded ? 'ring-4 ring-blue-200' : ''
            }`}
          >
            <Phone className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-12' : 'group-hover:scale-110'}`} />
          </button>
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
          
          {/* Phone Number on Hover */}
          <div className={`absolute bottom-full right-0 mb-2 transition-all duration-300 pointer-events-none ${
            isExpanded ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <div className="bg-gray-800 text-white py-2 px-3 rounded-lg whitespace-nowrap shadow-lg">
              <div className="text-center">
                <div className="text-sm font-semibold">033 606 1457</div>
                <div className="text-xs opacity-80">Nhấn để gọi</div>
              </div>
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}