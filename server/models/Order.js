const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'NPR' },
  status: { 
    type: String, 
    enum: ['Delivered', 'Shipped', 'Processing', 'Cancelled'],
    default: 'Processing'
  },
});

module.exports = mongoose.model('Order', orderSchema);