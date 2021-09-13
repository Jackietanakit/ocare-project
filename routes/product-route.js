const express = require("express");
const multer = require("../middleware/multer");
const {
  addProduct,
  getProduct,
  getMyProduct,
  editProduct,
} = require("../controller/productController");
const { ensureToken } = require("../middleware/ensureToken");

const router = express.Router();

router.post("/add", multer.array("uploadImages", 10), ensureToken, addProduct);
router.post(
  "/edit",
  multer.array("uploadImages", 10),
  ensureToken,
  editProduct
);
router.get("/", getProduct);
router.get("/myProduct", ensureToken, getMyProduct);

module.exports = {
  routes: router,
};
