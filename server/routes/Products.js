const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
  updateProduct,
} = require("../controller/Product");

const router = express.Router();
//products is already in the base path
router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchSingleProduct)
  .patch("/:id", updateProduct);

exports.router = router;
