const express = require("express");
const cors = require("cors");
const { products, cart } = require("./data");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET /products
app.get("/products", (req, res) => {
  res.json(products);
});

// POST /cart/add
app.post("/cart/add", (req, res) => {
  const product = products.find(p => p.id === req.body.productId);
  if (product) cart.push(product);
  res.json({ success: true });
});

// POST /cart/remove
app.post("/cart/remove", (req, res) => {
  const index = cart.findIndex(p => p.id === req.body.productId);
  if (index !== -1) cart.splice(index, 1);
  res.json({ success: true });
});

// GET /cart
app.get("/cart", (req, res) => {
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  let discount = 0;
  if (total >= 1000 && total <= 5000) discount = total * 0.1;
  else if (total > 5000) discount = total * 0.2;

  const final = total - discount;
  res.json({ items: cart, total, discount, final });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
