const { Router } = require("express");
const ProductManager = require("../managers/ProductManager");

const router = Router();
const productManager = new ProductManager("products.json");

// GET /api/products/
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(
      parseInt(req.params.pid)
    );
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products/
router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    await productManager.addProduct(newProduct);
    res
      .status(201)
      .json({
        message: "Producto agregado exitosamente.",
        product: newProduct,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const updatedFields = req.body;
    await productManager.updateProduct(pid, updatedFields);
    res.json({ message: "Producto actualizado correctamente." });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    await productManager.deleteProduct(pid);
    res.json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
