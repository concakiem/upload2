import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Quản Lý Sản Phẩm
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-blue-200">
            Trang chủ
          </Link>
          <Link href="/products" className="text-white hover:text-blue-200">
            Danh sách sản phẩm
          </Link>
          <Link href="/products/add" className="text-white hover:text-blue-200">
            Thêm sản phẩm
          </Link>
        </div>
      </div>
    </nav>
  );
}
