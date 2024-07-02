import express from "express";
import formidable from "express-formidable";

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  addProduct,
  addProductReview,
  fetchAllProducts,
  fetchNewProducts,
  fetchProductById,
  fetchProducts,
  fetchTopProducts,
  removeProduct,
  updateProductDetails,
} from "../controllers/productController.js";
import checkId from "../middlewares/checkId.js";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizedAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);

router
  .route("/:id/reviews")
  .post(authenticate, authorizedAdmin, checkId, addProductReview);

router.route("/top").get(fetchTopProducts);

router.route("/new").get(fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizedAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizedAdmin, removeProduct);

export default router;
