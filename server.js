const express = require("express");
const productRoutes = require("./routes/product-route");
const profileRoute = require("./routes/profile-route");
const mainRoute = require("./routes/main-route");
const authenRoute = require("./routes/authen-route");
const cors = require("cors");
const { credential } = require("firebase-admin");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "https://ocare-marketplace-ffa5a.web.app/",
    credential: true,
  })
);

app.use("/product", productRoutes.routes);
app.use("/profile", profileRoute.routes);
app.use("/main", mainRoute.routes);
app.use("/auth", authenRoute.routes);

app.listen(PORT, () => console.log("listening on port " + PORT));
