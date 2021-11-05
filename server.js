const express = require("express");
const productRoutes = require("./routes/product-route");
const profileRoute = require("./routes/profile-route");
const mainRoute = require("./routes/main-route");
const authenRoute = require("./routes/authen-route");
const cors = require("cors");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Header",
    "Origin,X-Requested-With,Content-Type,Accpet,content-type,application/json"
  );
});

app.use("/product", productRoutes.routes);
app.use("/profile", profileRoute.routes);
app.use("/main", mainRoute.routes);
app.use("/auth", authenRoute.routes);

app.listen(PORT, () => console.log("listening on port " + PORT));
