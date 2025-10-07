const { Router } = require("express");
const ProductManager = require("../managers/ProductManager");

const router = Router();
const productManager = new ProductManager("products.json");

// GET /
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products: products });
});

// GET /realtimeproducts
router.get("/realtimeproducts", async (req, res) => {
  // Al cargar la vista, pasamos la lista de productos actual.
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products: products });
});

module.exports = router;
