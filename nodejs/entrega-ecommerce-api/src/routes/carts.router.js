const { Router } = require("express");
const CartManager = require("../managers/CartManager");
const ProductManager = require("../managers/ProductManager");

const router = Router();
const cartManager = new CartManager("carts.json");
const productManager = new ProductManager("products.json");

// POST /api/carts/
router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res
      .status(201)
      .json({ message: "Carrito creado exitosamente.", cart: newCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/carts/:cid
router.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(parseInt(req.params.cid));
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: "Carrito no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    // Opcional pero recomendado: Validar que el producto realmente exista
    const productExists = await productManager.getProductById(pid);
    if (!productExists) {
      return res.status(404).json({ error: "El producto no existe." });
    }

    const updatedCart = await cartManager.addProductToCart(cid, pid);
    res.json({ message: "Producto agregado al carrito.", cart: updatedCart });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
