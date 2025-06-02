import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  product: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  customer: {
    fullName: {
      type: String,
      required: [true, 'Vui lòng nhập họ và tên'],
      trim: true,
      maxlength: [100, 'Họ và tên không được vượt quá 100 ký tự']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Vui lòng nhập số điện thoại'],
      trim: true,
      match: [/^[0-9+\-\s()]+$/, 'Số điện thoại không hợp lệ']
    },
    address: {
      type: String,
      required: [true, 'Vui lòng nhập địa chỉ'],
      trim: true,
      maxlength: [500, 'Địa chỉ không được vượt quá 500 ký tự']
    },
    note: {
      type: String,
      trim: true,
      maxlength: [1000, 'Ghi chú không được vượt quá 1000 ký tự']
    }
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Tổng tiền không được âm']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware để tự động cập nhật updatedAt khi save
OrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
