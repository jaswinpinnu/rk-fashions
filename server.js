const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/rkfashions", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  size: String,
  image: String
});

const Product = mongoose.model("Product", ProductSchema);

// Order Schema
const OrderSchema = new mongoose.Schema({
  username: String,
  items: Array,
  total: Number,
  address: Object,
  status: {
    type: String,
    default: "Processing"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", OrderSchema);

/* ======================
   USER ROUTES
====================== */

// Register
app.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials"
    });
  }

  res.json(user);
});

/* ======================
   PRODUCT ROUTES
====================== */

// Get Products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add Product
app.post("/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Delete Product
app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* ======================
   ORDER ROUTES
====================== */

// Place Order
app.post("/orders", async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

// Get Orders
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Update Status
app.put("/orders/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(order);
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});