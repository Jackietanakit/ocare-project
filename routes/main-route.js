const express = require("express");
const {
  getMainComponent,
  searchMainComponent,
} = require("../controller/mainController");

const router = express.Router();

router.get("/", getMainComponent);
router.get("/search", searchMainComponent);

module.exports = {
  routes: router,
};
