const mongoose = require ("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: false },
        qty: { type: Number, required: false },
        image: { type: String, required: false },
        price: { type: String, required: false },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: false,
        },
      },
    ],
    informationAddress: {
      contact: { type: String, required: false },
      firstName: { type: String, required: false },
      lastName: { type: String, required: false },
      address: { type: String, required: false },
      nearTo: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      pinCode: { type: String, required: false },
      country: { type: String, required: false },
      phone: { type: Number, required: false },
    },
    shippingAddress: {
      contact: { type: String },
      shipIn: { type: String },
      phone: { type: Number },
      free: { type: String },
      instraction: { type: String },
    },
    paymentMethod:{
      payment: { type: String },
      billingAddress: { type: String },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date }, 
    isDelivered: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports =  Order;
