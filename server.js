const express = require("express");
const productRoutes = require("./routes/product-route");
const profileRoute = require("./routes/profile-route");
const mainRoute = require("./routes/main-route");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

app.use("/product", productRoutes.routes);
app.use("/profile", profileRoute.routes);
app.use("/main", mainRoute.routes);

app.listen(PORT, () => console.log("listening on port " + PORT));
