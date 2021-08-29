const express = require("express");
const multer = require("../middleware/multer");
const { addProduct, getProduct } = require("../controller/productController");

const router = express.Router();

router.post("/add", multer.array("images", 5), addProduct);
router.get("/product/:id", getProduct);

module.exports = {
  routes: router,
};
