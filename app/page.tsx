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
