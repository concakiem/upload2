import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên sản phẩm'],
    trim: true,
    maxlength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự'],
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả sản phẩm'],
    trim: true,
    maxlength: [1000, 'Mô tả sản phẩm không được vượt quá 1000 ký tự'],
  },
  price: {
    type: Number,
    required: [true, 'Vui lòng nhập giá sản phẩm'],
    min: [0, 'Giá không được âm'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Vui lòng nhập URL hình ảnh'],
  },
  category: {
    type: String,
    required: [true, 'Vui lòng chọn danh mục'],
    enum: ['Điện tử', 'Thời trang', 'Đồ gia dụng', 'Thực phẩm', 'Khác'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
