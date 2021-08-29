const express = require("express");
const multer = require("../middleware/multer");
const { editProfile, addProfile } = require("../controller/profileController");

const router = express.Router();

router.post("/add", multer.single("image"), addProfile);
router.post("/edit", editProfile);

module.exports = {
  routes: router,
};
