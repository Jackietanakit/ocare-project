const express = require("express");
const multer = require("../middleware/multer");
const {
  editProfile,
  addProfile,
  getProfile,
} = require("../controller/profileController");
const { ensureToken } = require("../middleware/ensureToken");

const router = express.Router();

router.post("/add", multer.single("image"), ensureToken, addProfile);
router.get("/get", ensureToken, getProfile);
router.post("/edit", multer.single("image"), ensureToken, editProfile);

module.exports = {
  routes: router,
};
