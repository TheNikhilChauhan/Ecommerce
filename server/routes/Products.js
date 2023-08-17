const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
  updateProduct,
} = require("../controller/Product");
const { Product } = require("../model/Product");

const router = express.Router();
//products is already in the base path
router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchSingleProduct)
  .patch("/:id", updateProduct)
  .get("/update/test", async (req, res) => {
    const products = await Product.find({});
    for (let product of products) {
      //for adding discount price to the data
      product.discountPrice = Math.round(
        product.price * (1 - product.discountPercentage / 100)
      );
      await product.save();
      console.log(product.title + "updated");
    }
    res.send("ok");
  });

exports.router = router;
