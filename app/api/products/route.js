import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    
    // Lấy FormData để xử lý file upload
    const formData = await request.formData();
    
    // Lấy thông tin sản phẩm
    const name = formData.get('name');
    const description = formData.get('description');
    const price = Number(formData.get('price'));
    const category = formData.get('category');
    const imageFile = formData.get('image');
    
    let imageUrl = '';
    
    // Xử lý upload hình ảnh nếu có
    if (imageFile) {
      // Tạo tên file duy nhất để tránh trùng lặp
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Tạo tên file duy nhất
      const fileName = `${uuidv4()}_${imageFile.name.replace(/\s/g, '')}`;
      
      // Tạo thư mục nếu chưa tồn tại
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      
      // Ghi file vào thư mục public/uploads
      await writeFile(
        path.join(uploadDir, fileName),
        buffer
      );
      
      // Lưu đường dẫn tới file
      imageUrl = `/uploads/${fileName}`;
    } else {
      return NextResponse.json(
        { success: false, message: 'Vui lòng upload hình ảnh sản phẩm' },
        { status: 400 }
      );
    }
    
    // Tạo sản phẩm mới với đường dẫn hình ảnh
    const product = await Product.create({
      name,
      description,
      price,
      category,
      imageUrl
    });
    
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}