// File: app/api/orders/route.js
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { product, customer, orderStatus, totalAmount } = body;
    
    // Validate dữ liệu đầu vào
    if (!product || !customer || !customer.fullName || !customer.phoneNumber || !customer.address) {
      return NextResponse.json({
        success: false,
        message: 'Thiếu thông tin bắt buộc',
        required: ['product', 'customer.fullName', 'customer.phoneNumber', 'customer.address']
      }, { status: 400 });
    }

    // Tạo đơn hàng mới với Mongoose model
    const orderData = {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category
      },
      customer: {
        fullName: customer.fullName.trim(),
        phoneNumber: customer.phoneNumber.trim(),
        address: customer.address.trim(),
        note: customer.note ? customer.note.trim() : ''
      },
      orderStatus: orderStatus || 'pending',
      totalAmount: totalAmount || product.price
    };

    const order = await Order.create(orderData);

    console.log('Đơn hàng mới được tạo:', order._id);

    return NextResponse.json({
      success: true,
      message: 'Đơn hàng đã được tạo thành công',
      orderId: order._id,
      data: order
    }, { status: 201 });

  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    
    // Xử lý lỗi validation từ Mongoose
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: errorMessages
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Lỗi server khi tạo đơn hàng',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    
    // Lấy danh sách đơn hàng (có thể thêm pagination sau)
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(50); // Giới hạn 50 đơn hàng gần nhất
    
    return NextResponse.json({
      success: true,
      message: 'Lấy danh sách đơn hàng thành công',
      data: orders,
      total: orders.length
    });
    
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi server khi lấy danh sách đơn hàng',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}