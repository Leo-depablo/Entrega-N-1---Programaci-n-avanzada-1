const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const path = require("path");

const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");

const ProductManager = require("./managers/ProductManager"); // Importar el Manager
const productManager = new ProductManager("products.json"); // Instanciar para usar en Sockets

const app = express();
const PORT = 8080;

// ----------------------
// Configuración de Handlebars
// ----------------------
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// ----------------------
// Configuración de Middlewares
// ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Servir archivos estáticos (CSS, JS del cliente)
app.use(express.static(path.join(__dirname, "public")));

// ----------------------
// Inicialización del Servidor HTTP y Sockets
// ----------------------
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const io = new Server(httpServer);

// ----------------------
// Middleware para Sockets e Intercambio de Datos
// ----------------------
app.use((req, res, next) => {
  // Inyectar 'io' en el objeto request para usarlo en otros routers (si es necesario)
  req.io = io;
  next();
});

// ----------------------
// Configuración de Rutas
// ----------------------
app.use("/", viewsRouter); // Rutas para vistas (Handlebars)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// ----------------------
// Lógica de Socket.IO (Actualizaciones en tiempo real)
// ----------------------
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Función auxiliar para emitir la lista actualizada de productos a TODOS los clientes
  const sendProductsUpdate = async () => {
    const products = await productManager.getProducts();
    io.emit("productsUpdate", products);
  };

  // 1. Enviar productos al conectar
  sendProductsUpdate();

  // 2. Manejar la creación de un nuevo producto (desde realTimeProducts.handlebars)
  socket.on("addProduct", async (newProduct) => {
    try {
      // Asegurarse de que el status sea booleano y el price/stock sean números
      newProduct.status =
        newProduct.status === "true" || newProduct.status === true;
      newProduct.price = parseFloat(newProduct.price);
      newProduct.stock = parseInt(newProduct.stock);

      await productManager.addProduct(newProduct);
      await sendProductsUpdate(); // Notificar a todos los clientes del cambio
    } catch (error) {
      console.error("Error al agregar producto por socket:", error.message);
      socket.emit("error", "Error al crear producto. Verifique los datos.");
    }
  });

  // 3. Manejar la eliminación de un producto (desde realTimeProducts.handlebars)
  socket.on("deleteProduct", async (id) => {
    try {
      await productManager.deleteProduct(id);
      await sendProductsUpdate(); // Notificar a todos los clientes del cambio
    } catch (error) {
      console.error("Error al eliminar producto por socket:", error.message);
      socket.emit("error", `No se pudo eliminar el producto con ID ${id}.`);
    }
  });
});
