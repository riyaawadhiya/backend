import {
  fetchAllProducts,
  createNewProduct,
} from "../repositories/product.repository.js";
import { products } from "../data/products.js";

export const getAllProducts = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, stock } = req.body;

    // Basic validation (backend safety)
    if (!name || price == null || stock == null) {
      return res.status(400).json({
        success: false,
        message: "Name, price and stock are required",
      });
    }

    const product = await createNewProduct({
      name,
      price,
      stock,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};