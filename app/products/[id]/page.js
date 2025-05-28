import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';
import ProductDetailPage from '@/components/ProductDetailPage ';

export default async function ProductDetail({ params }) {
  const { id } = await params;
  
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  
  if (!product) {
    notFound();
  }

  // Chuyển đổi _id và createdAt để có thể gửi qua JSON
  product._id = product._id.toString();
  product.createdAt = new Date(product.createdAt).toLocaleString('vi-VN');

  return <ProductDetailPage product={product} />;
}
