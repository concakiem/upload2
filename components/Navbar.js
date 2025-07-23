'use client';

import Link from 'next/link';
import { Book, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold flex items-center space-x-2">
          <Book className="w-6 h-6" />
          <span className="hidden sm:inline">Cửa hàng sách Kon Tum</span>
          <span className="sm:hidden">Cửa hàng sách Kon Tum</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-white hover:text-blue-200 px-3 py-2 rounded">
            Trang chủ
          </Link>
          <Link href="#" className="text-white hover:text-blue-200 px-3 py-2 rounded">
            Sản phẩm
          </Link>
          <Link href="#" className="text-white hover:text-blue-200 px-3 py-2 rounded">
            Thông báo
          </Link>
          <Link href="#" className="text-white hover:text-blue-200 px-3 py-2 rounded">
            Đơn hàng
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link 
            href="/" 
            className="block text-white hover:text-blue-200 hover:bg-blue-700 px-4 py-3 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Trang chủ
          </Link>
          <Link 
            href="#" 
            className="block text-white hover:text-blue-200 hover:bg-blue-700 px-4 py-3 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Sản phẩm
          </Link>
          <Link 
            href="#" 
            className="block text-white hover:text-blue-200 hover:bg-blue-700 px-4 py-3 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Thông báo
          </Link>
          <Link 
            href="#" 
            className="block text-white hover:text-blue-200 hover:bg-blue-700 px-4 py-3 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Đơn hàng
          </Link>
        </div>
      )}
    </nav>
  );
}