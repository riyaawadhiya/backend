import Product from "../models/product.model.js";


export const fetchAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

export const createNewProduct = async ({ name, price, stock }) => {
  const product = new Product({
    name,
    price,
    stock,
  });

  return await product.save();
};