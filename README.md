# Entrega N° 1 - API de E-commerce

Este es un servidor desarrollado con **Node.js y Express** para gestionar productos y carritos de compra. La persistencia de la información se realiza utilizando archivos JSON, simulando una base de datos simple para la primera entrega.

---

### Características Principales

* **Gestión de Productos:**
    * `GET /api/products`: Obtiene todos los productos.
    * `GET /api/products/:pid`: Obtiene un producto por su ID.
    * `POST /api/products`: Agrega un nuevo producto.
    * `PUT /api/products/:pid`: Actualiza un producto existente.
    * `DELETE /api/products/:pid`: Elimina un producto.
* **Gestión de Carritos:**
    * `POST /api/carts`: Crea un nuevo carrito.
    * `GET /api/carts/:cid`: Lista los productos de un carrito específico.
    * `POST /api/carts/:cid/product/:pid`: Agrega un producto a un carrito.
* **Persistencia de Datos:** La información se almacena en los archivos `products.json` y `carts.json` utilizando un `ProductManager` y un `CartManager` personalizados.

---

### Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución para JavaScript.
* **Express.js**: Framework para la construcción de la API.
* **Sistema de Archivos (FS)**: Módulo nativo de Node.js para la persistencia de datos.

---

### Instalación y Ejecución

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

### Uso de la API (Endpoints de Ejemplo)

Una vez que el servidor esté en funcionamiento, puedes usar herramientas como **Postman** o **Insomnia** para probar los siguientes endpoints.

**Productos**

* **Agregar un producto:**
    * **Método:** `POST`
    * **URL:** `http://localhost:8080/api/products`
    * **Body (raw JSON):**
        ```json
        {
          "title": "Monitor Gamer",
          "description": "Monitor de 24 pulgadas, 144Hz",
          "code": "MTR144HZ",
          "price": 250.00,
          "status": true,
          "stock": 10,
          "category": "Monitores",
          "thumbnails": []
        }
        ```
* **Obtener un producto por ID:**
    * **Método:** `GET`
    * **URL:** `http://localhost:8080/api/products/1`

**Carritos**

* **Crear un carrito:**
    * **Método:** `POST`
    * **URL:** `http://localhost:8080/api/carts`
* **Agregar un producto a un carrito:**
    * **Método:** `POST`
    * **URL:** `http://localhost:8080/api/carts/1/product/1`
    *(Asegúrate de que el carrito con ID 1 y el producto con ID 1 existan)*

---

### Autor

* **Leonardo Depablo**
