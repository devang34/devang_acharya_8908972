const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { dbConnect } = require("./dbConnect");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const commentRoutes = require("./routes/commentRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Connect to mongodb database
dbConnect();

app.use(cors());

app.use(express.static("public"));

app.use(bodyParser.json());

// user api routes
app.use("/api/users", userRoutes);

// product api routes
app.use("/api/products", productRoutes);

// comment api routes
app.use("/api/comments", commentRoutes);

// cart api routes
app.use("/api/carts", cartRoutes);

// order api routes
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Hello World Chhatterdeep Singh Assignment 4!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Assignment 4 running on port http://localhost:${PORT}/`);
});
