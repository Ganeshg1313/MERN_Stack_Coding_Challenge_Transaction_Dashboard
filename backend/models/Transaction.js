const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  imageUrl: String,
  sold: Boolean,
  dateOfSale: Date,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
