const express = require("express");
const multer = require("../middleware/multer");
const {
  addProduct,
  getProduct,
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

module.exports = {
  routes: router,
};
