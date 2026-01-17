import {
  placeOrderWithStockCheck,
} from "../repositories/order.repository.js";


export const placeOrder = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid productId and quantity are required",
      });
    }

  
    const orderResult = await placeOrderWithStockCheck(
      productId,
      quantity
    );

    
    if (!orderResult.success) {
      return res.status(400).json({
        success: false,
        message: orderResult.message,
      });
    }

    const io = req.app.get("io");
    io.emit("stock:update", {
      productId,
      newStock: orderResult.updatedStock,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: orderResult.order,
    });
  } catch (error) {
    next(error);
  }
};