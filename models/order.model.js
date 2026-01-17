import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },


    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

 
    priceAtPurchase: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["PLACED"],
      default: "PLACED",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;