import Link from 'next/link';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import HomeProductList from '@/components/HomeProductList';

export const dynamic = 'force-dynamic';



export default async function Home() {
  await connectToDatabase();
  // const products = await Product.find({}).sort({ createdAt: -1 }).limit(6).lean();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  
  // Chuyển _id từ đối tượng ObjectId sang chuỗi
  const serializedProducts = products.map(product => ({
    ...product,
    _id: (product as { _id: string })._id.toString(),
    createdAt: product.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Hệ Thống Quản Lý Sản Phẩm</h1>
        <p className="text-xl mb-8">
          Ứng dụng quản lý sản phẩm đơn giản được xây dựng với Next.js 15, Node.js và MongoDB Atlas
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Xem danh sách sản phẩm
          </Link>
          <Link
            href="/products/add"
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            Thêm sản phẩm mới
          </Link>
        </div>
      </div>
      
      {/* Phần hiển thị sản phẩm nổi bật */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Tất Cả Sản Phẩm</h2>
        <HomeProductList products={serializedProducts} />
    
      </div>
      {/* {serializedProducts.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="text-blue-600 hover:underline text-lg font-medium"
            >
              Xem tất cả sản phẩm &rarr;
            </Link>
          </div>
        )} */}
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Next.js 15</h2>
          <p>
            Framework React hiện đại với App Router và Server Components giúp xây dựng ứng dụng web nhanh và hiệu quả.
          </p>
        </div>
        
        <div className="border rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Node.js</h2>
          <p>
            Môi trường runtime JavaScript phía server, cung cấp API Routes cho việc xử lý dữ liệu.
          </p>
        </div>
        
        <div className="border rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">MongoDB Atlas</h2>
          <p>
            Cơ sở dữ liệu NoSQL đám mây, giúp lưu trữ dữ liệu sản phẩm an toàn và dễ dàng mở rộng.
          </p>
        </div>
      </div>
    </div>
  );
}