const express = require("express");
const multer = require("../middleware/multer");
const { addProduct, getProduct } = require("../controller/productController");
const { ensureToken } = require("../middleware/ensureToken");

const router = express.Router();

router.post("/add", multer.array("images", 5), ensureToken, addProduct);
router.get("/product/:id", getProduct);

module.exports = {
  routes: router,
};
