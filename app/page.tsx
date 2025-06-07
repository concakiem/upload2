import Link from 'next/link';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import HomeProductList from '@/components/HomeProductList';

export const dynamic = 'force-dynamic';

export default async function Home() {
  await connectToDatabase();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  
  // Chuyển _id từ đối tượng ObjectId sang chuỗi
  const serializedProducts = products.map(product => ({
    ...product,
    _id: (product as { _id: string })._id.toString(),
    createdAt: product.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-12">
      {/* Hero Section - Sách Giáo Khoa */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Sách Giáo Khoa Chất Lượng Cao</h1>
          <p className="text-xl mb-8 leading-relaxed">
            Khám phá bộ sưu tập sách giáo khoa đầy đủ từ lớp 1 đến lớp 12, 
            được tuyển chọn kỹ càng để hỗ trợ học tập hiệu quả nhất cho học sinh
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-blue-600 py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg"
            >
              Xem Tất Cả Sách
            </Link>
            <Link
              href="/products/add"
              className="bg-yellow-500 text-white py-4 px-8 rounded-lg hover:bg-yellow-600 transition-colors font-semibold text-lg shadow-lg"
            >
              Đăng Bán Sách
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 text-center">Sách Chính Thức</h3>
          <p className="text-gray-600 text-center">
            Tất cả sách giáo khoa đều là phiên bản chính thức từ Nhà Xuất Bản Giáo Dục Việt Nam, 
            đảm bảo chất lượng và độ chính xác.
          </p>
        </div>
        
        <div className="bg-white border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 text-center">Giá Cả Hợp Lý</h3>
          <p className="text-gray-600 text-center">
            Cam kết mang đến sách giáo khoa với mức giá tốt nhất thị trường, 
            giúp phụ huynh tiết kiệm chi phí học tập cho con em.
          </p>
        </div>
        
        <div className="bg-white border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 text-center">Giao Hàng Nhanh</h3>
          <p className="text-gray-600 text-center">
            Dịch vụ giao hàng nhanh chóng trong vòng 24-48 giờ tại nội thành, 
            đảm bảo học sinh có sách kịp thời cho năm học mới.
          </p>
        </div>
      </div>
      
      {/* Phần hiển thị sản phẩm */}
      <div className="mt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Sách Giáo Khoa Mới Nhất</h2>
          <p className="text-gray-600 text-lg">
            Cập nhật liên tục các đầu sách mới theo chương trình giáo dục phổ thông
          </p>
        </div>
        <HomeProductList products={serializedProducts} />
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16 px-6 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4">Bạn Có Sách Cần Bán?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Tham gia cộng đồng mua bán sách giáo khoa của chúng tôi. 
          Đăng bán sách cũ và tìm mua những cuốn sách cần thiết.
        </p>
        <Link
          href="/products/add"
          className="bg-white text-green-600 py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg inline-block"
        >
          Đăng Bán Sách Ngay
        </Link>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-gray-600">Đầu Sách</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
          <div className="text-gray-600">Khách Hàng</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
          <div className="text-gray-600">Cấp Lớp</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg">
          <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
          <div className="text-gray-600">Giao Hàng</div>
        </div>
      </div>
    </div>
  );
}
