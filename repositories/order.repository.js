import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const placeOrderWithStockCheck = async (
  productId,
  quantity
) => {
  
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: productId,
        stock: { $gte: quantity }, 
      },
      {
        $inc: { stock: -quantity }, 
      },
      {
        new: true, 
        session,
      }
    );

   
    if (!updatedProduct) {
      await session.abortTransaction();
      session.endSession();

      return {
        success: false,
        message: "Insufficient stock or invalid product",
      };
    }

    
    const order = await Order.create(
      [
        {
          product: productId,
          quantity,
          priceAtPurchase: updatedProduct.price,
        },
      ],
      { session }
    );

  
    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      order: order[0],
      updatedStock: updatedProduct.stock,
    };
  } catch (error) {
    
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};