import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductForm from '@/components/ProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }) {
  const { id } = params;
  
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  
  if (!product) {
    notFound();
  }

  // Chuyển đổi _id để có thể gửi qua JSON
  product._id = product._id.toString();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Chỉnh sửa sản phẩm</h1>
      <ProductForm product={product} />
    </div>
  );
}
