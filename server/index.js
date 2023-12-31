require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");
const cartRoutes = require("./routes/cart");
const db = require("./models");

const PORT = 8080;
const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", authRoutes);
app.use("/item", itemRoutes);
app.use("/cart", cartRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
