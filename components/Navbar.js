import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Cửa hàng sách Kon Tum
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-blue-200">
            Trang chủ
          </Link>
          <Link href="#" className="text-white hover:text-blue-200">
            Sản phẩm
          </Link>
          <Link href="#" className="text-white hover:text-blue-200">
            Thông báo
          </Link>
          <Link href="#" className="text-white hover:text-blue-200">
            Đơn hàng
          </Link>
        </div>
      </div>
    </nav>
  );
}
