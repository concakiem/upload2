import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    // Tìm sản phẩm hiện tại
    const existingProduct = await Product.findById(id);
    
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }
    
    // Lấy FormData để xử lý file upload
    const formData = await request.formData();
    
    // Lấy thông tin sản phẩm cập nhật
    const name = formData.get('name');
    const description = formData.get('description');
    const price = Number(formData.get('price'));
    const category = formData.get('category');
    const imageFile = formData.get('image');
    const oldImageUrl = formData.get('imageUrl') || existingProduct.imageUrl;
    
    let imageUrl = oldImageUrl;
    
    // Xử lý upload hình ảnh mới nếu có
    if (imageFile) {
      // Tạo tên file duy nhất để tránh trùng lặp
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Tạo tên file duy nhất
      const fileName = `${uuidv4()}_${imageFile.name.replace(/\s/g, '')}`;
      
      // Tạo thư mục nếu chưa tồn tại
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }
      
      // Ghi file vào thư mục public/uploads
      await writeFile(
        path.join(uploadDir, fileName),
        buffer
      );
      
      // Lưu đường dẫn tới file
      imageUrl = `/uploads/${fileName}`;
      
      // Xóa file cũ nếu tồn tại và không phải là đường dẫn URL bên ngoài
      if (oldImageUrl && oldImageUrl.startsWith('/uploads/')) {
        try {
          const oldFilePath = path.join(process.cwd(), 'public', oldImageUrl);
          await fs.access(oldFilePath);
          await fs.unlink(oldFilePath);
        } catch (err) {
          // Bỏ qua lỗi nếu không tìm thấy file
          console.log('Lỗi khi xóa file cũ:', err);
        }
      }
    }
    
    // Cập nhật sản phẩm với thông tin mới
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        imageUrl
      },
      {
        new: true,
        runValidators: true,
      }
    );
    
    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    // Tìm sản phẩm trước khi xóa để lấy đường dẫn hình ảnh
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }
    
    // Xóa file hình ảnh nếu là file được upload
    if (product.imageUrl && product.imageUrl.startsWith('/uploads/')) {
      try {
        const filePath = path.join(process.cwd(), 'public', product.imageUrl);
        await fs.access(filePath);
        await fs.unlink(filePath);
      } catch (err) {
        // Bỏ qua lỗi nếu không tìm thấy file
        console.log('Lỗi khi xóa file:', err);
      }
    }
    
    // Xóa sản phẩm khỏi database
    await Product.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}