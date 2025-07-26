'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  
  // Chỉ hiển thị footer trên trang chủ
  if (pathname !== '/') {
    return null;
  }
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Thông tin cửa hàng */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Book className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-bold">Cửa hàng sách Kon Tum</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Cung cấp những cuốn sách chất lượng cao với giá cả hợp lý. 
              Phục vụ cộng đồng yêu sách tại Kon Tum và các tỉnh lân cận.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Hướng dẫn mua hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Danh mục sách */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">Danh mục sách</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sách giáo khoa
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sách tham khảo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Văn học
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Khoa học - Kỹ thuật
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sách thiếu nhi
                </Link>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">
                    653 Nguyễn Huệ, Thành phố Kon Tum, 
                    653 Nguyễn Huệ, Phường Kon Tum,
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">
                    Hotline: <a href="tel:0336061457" className="hover:text-white">033 606 1457</a>
                  </p>
                  <p className="text-sm text-gray-300">
                    Mobile: <a href="tel:0336061457" className="hover:text-white">033 606 1457</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  <a href="mailto:info@nhasachkt.vn" className="hover:text-white">
                    info@nhasachkt.vn
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Đường phân cách */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Cửa hàng sách Kon Tum. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>

        {/* Giờ mở cửa */}
        <div className="mt-6 text-center">
          <div className="inline-block bg-gray-700 rounded-lg px-4 py-2">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-blue-400">Giờ mở cửa:</span> 
              Thứ 2 - Chủ nhật: 7:00 - 21:00
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}