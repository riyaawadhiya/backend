import express from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// (Optional) create product
router.post("/", createProduct);

export default router;
