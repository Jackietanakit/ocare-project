const express = require("express");
const { ensureToken } = require("../middleware/ensureToken");
const {
  signUpApi,
  loginApi,
  logoutApi,
  checkUser,
  forgetPassword,
} = require("../controller/authController");

const router = express.Router();

// sign in
router.post("/signup", signUpApi);
router.post("/login", loginApi);
router.get("/logout", ensureToken, logoutApi);
router.get("/check", checkUser);
router.post("/forget", forgetPassword);

module.exports = {
  routes: router,
};
