// File: app/api/orders/route.js
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextResponse } from 'next/server';

let client;
let db;

async function connectToDatabase() {
  if (!client) {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('MONGODB_URI không được định nghĩa trong file .env.local');
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    try {
      await client.connect();
      // Ping để kiểm tra kết nối
      await client.db("admin").command({ ping: 1 });
      console.log("Đã kết nối thành công tới MongoDB Atlas!");
      
      // Lấy tên database từ URI hoặc sử dụng tên mặc định
      const dbName = process.env.MONGODB_DB_NAME || 'ecommerce_store';
      db = client.db(dbName);
    } catch (error) {
      console.error('Lỗi kết nối MongoDB Atlas:', error);
      throw error;
    }
  }
  return db;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const database = await connectToDatabase();
    const ordersCollection = database.collection('orders');

    // Validate dữ liệu đầu vào
    const { product, customer } = body;
    
    if (!product || !customer || !customer.fullName || !customer.phoneNumber || !customer.address) {
      return NextResponse.json({
        success: false,
        message: 'Thiếu thông tin bắt buộc',
        required: ['product', 'customer.fullName', 'customer.phoneNumber', 'customer.address']
      }, { status: 400 });
    }

    const orderData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await ordersCollection.insertOne(orderData);

    console.log('Đơn hàng mới được tạo:', result.insertedId);

    return NextResponse.json({
      success: true,
      message: 'Đơn hàng đã được tạo thành công',
      orderId: result.insertedId
    }, { status: 201 });

  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi server khi tạo đơn hàng',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Orders API is working!',
    methods: ['POST'],
    endpoint: '/api/orders'
  });
}