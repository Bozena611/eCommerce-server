const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "admins"
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: mongoose.Types.ObjectId,
        ref: "products"
      }
    }
  ]
});

module.exports = mongoose.model('Cart', CartSchema);
