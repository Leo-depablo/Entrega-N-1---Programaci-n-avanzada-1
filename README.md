# Entrega N° 2 - API de E-commerce con WebSockets

Este proyecto es un servidor desarrollado con **Node.js y Express** para gestionar productos y carritos de compra. La persistencia de la información se realiza utilizando archivos JSON.

---

## 🚀 Funcionalidades y Endpoints

### 1. Gestión de Productos (Entrega N° 1)

* `GET /api/products`: Lista todos los productos.
* `GET /api/products/:pid`: Obtiene un producto por su ID.
* `POST /api/products`: Agrega un nuevo producto.
* `PUT /api/products/:pid`: Actualiza un producto existente.
* `DELETE /api/products/:pid`: Elimina un producto.

### 2. Gestión de Carritos (Entrega N° 1)

* `POST /api/carts`: Crea un nuevo carrito.
* `GET /api/carts/:cid`: Lista los productos de un carrito específico.
* `POST /api/carts/:cid/product/:pid`: Agrega un producto a un carrito e incrementa la cantidad si ya existe.

### 3. Vistas en Tiempo Real (Entrega N° 2)

* `GET /`: Muestra la lista de productos estática renderizada con Handlebars.
* `GET /realtimeproducts`: Muestra la lista de productos que **se actualiza en tiempo real** mediante WebSockets (Socket.IO).

---

## 🛠️ Tecnologías y Características

* **Motor de Plantillas:** **Handlebars (Express-Handlebars)** para el renderizado de vistas.
* **Tiempo Real:** **Socket.IO** (WebSockets) para la comunicación bidireccional entre el cliente y el servidor.
    * La creación y eliminación de productos en `/realtimeproducts` se maneja **directamente a través de sockets**.
* **Persistencia de Datos:** Archivos `products.json` y `carts.json`.

---

## ⚙️ Instalación y Ejecución

Para poner en marcha el servidor, sigue estos sencillos pasos:

1.  **Clona el repositorio:**
    `git clone https://github.com/Leo-depablo/Entrega-N-1---Programaci-n-avanzada-1.git`
2.  **Ve a la carpeta del proyecto:**
    `cd Entrega-N-1---Programaci-n-avanzada-1`
3.  **Instala las dependencias:**
    `npm install`
4.  **Inicia el servidor:**
    `node src/app.js`

El servidor se ejecutará en el puerto `8080`.

---

## 🌐 Pruebas y Endpoints Clave

Para probar la funcionalidad en tiempo real:

1.  Abre **`http://localhost:8080/realtimeproducts`** en dos pestañas del navegador.
2.  Usa los formularios de **una pestaña** para agregar o eliminar un producto.
3.  Observa cómo la lista en la **segunda pestaña** se actualiza de forma instantánea.

---

## 👤 Autor

* **Leo de Pablo**
