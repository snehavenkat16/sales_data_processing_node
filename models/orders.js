const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  productId: { type: String, required: true },  
  customerId: { type: String, required: true },
  region: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  dateOfSale: { type: Date, required: true },
  quantitySold: { type: Number, required: true }
});

module.exports = mongoose.model('order', OrderSchema);