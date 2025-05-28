import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductList from '@/components/ProductList';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  await connectToDatabase();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  
  // Chuyển _id từ đối tượng ObjectId sang chuỗi
  const serializedProducts = products.map(product => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
        <Link
          href="/products/add"
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Thêm sản phẩm mới
        </Link>
      </div>
      
      <ProductList initialProducts={serializedProducts} />
    </div>
  );
}
