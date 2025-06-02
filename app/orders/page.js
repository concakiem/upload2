import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  await connectToDatabase();
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
  
  // Chuyển _id từ đối tượng ObjectId sang chuỗi
  const serializedOrders = orders.map(order => ({
    ...order,
    _id: order._id.toString(),
    product: {
      ...order.product,
      id: order.product.id.toString()
    },
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString()
  }));

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-orange-100 text-orange-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Đang chờ',
      confirmed: 'Đã xác nhận',
      processing: 'Đang xử lý',
      shipped: 'Đã gửi hàng',
      delivered: 'Đã giao hàng',
      cancelled: 'Đã hủy'
    };
    return texts[status] || status;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <div className="text-sm text-gray-600">
          Tổng cộng: {serializedOrders.length} đơn hàng
        </div>
      </div>
      
      {serializedOrders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Chưa có đơn hàng nào</p>
          <Link
            href="/products"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Xem sản phẩm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {serializedOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Đơn hàng #{order._id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString('vi-VN')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                  {getStatusText(order.orderStatus)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thông tin sản phẩm */}
                <div>
                  <h4 className="font-medium mb-2">Sản phẩm</h4>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={order.product.imageUrl}
                      alt={order.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{order.product.name}</p>
                      <p className="text-sm text-gray-600">{order.product.category}</p>
                      <p className="text-blue-600 font-bold">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(order.product.price)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thông tin khách hàng */}
                <div>
                  <h4 className="font-medium mb-2">Thông tin khách hàng</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Họ tên:</span> {order.customer.fullName}</p>
                    <p><span className="font-medium">Điện thoại:</span> {order.customer.phoneNumber}</p>
                    <p><span className="font-medium">Địa chỉ:</span> {order.customer.address}</p>
                    {order.customer.note && (
                      <p><span className="font-medium">Ghi chú:</span> {order.customer.note}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div className="text-lg font-bold text-blue-600">
                  Tổng tiền: {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(order.totalAmount)}
                </div>
                <Link
                  href={`/products/${order.product.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Xem sản phẩm →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
