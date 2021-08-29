const express = require("express");
const { getMainComponent } = require("../controller/mainController");

const router = express.Router();

router.get("/", getMainComponent);

module.exports = {
  routes: router,
};
