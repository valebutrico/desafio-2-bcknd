const fs = require('fs');
class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async addProduct(nuevoObjeto) {
        let { title, description, price, thumbnail, code, stock } = nuevoObjeto;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El código debe ser único, ingrese un código distinto.");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct);
    }

    async getProducts() {
        console.log(this.products);
        return this.products;
    }

    async getProductById(id) {        
        const buscado = this.products.find(item => item.id === id);

        if (!buscado) {
            console.log(`Producto con id: ${id} no encontrado`);
        } else {
            console.log(`Producto con id: ${id} y código: ${buscado.code}, encontrado:`);
            return buscado;
        }
    }

    async updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const { id: ignoredId, ...updatedData } = updatedProduct;
            this.products[index] = { ...this.products[index], ...updatedData };
            console.log(`Producto con id: ${id} actualizado.`);
        } else {
            console.log(`Producto con id: ${id} no encontrado para actualizar.`);
        }
    }

    async deleteProduct(id) {
        const initialLength = this.products.length;
        this.products = this.products.filter(product => product.id !== id);
        if (this.products.length < initialLength) {
            console.log(`Producto con id: ${id} eliminado.`);
        } else {
            console.log(`Producto con id: ${id} no encontrado para eliminar.`);
        }
    }
}

// Pruebas --------------------------------------------------------------------------------------
const manager = new ProductManager();
console.log("\nProductos iniciales:", manager.getProducts()); 

manager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
});

console.log("\nProductos después de adiciones:", manager.getProducts()); 

// Búsqueda de productos por ID ------------------------------------------------------------------
console.log("\nBuscando producto con ID 1:", manager.getProductById(1));
console.log("Buscando producto con ID 999 (inexistente):", manager.getProductById(999));

// Actualización de producto --------------------------------------------------------------------
console.log("\nActualizando el precio del producto con ID 1 a 5000...");
manager.updateProduct(1, { price: 5000 });

// Verificación de la actualización --------------------------------------------------------------
console.log("Verificando actualización del producto con ID 1:", manager.getProductById(1));

// Eliminación de producto -----------------------------------------------------------------------
console.log("\nEliminando el producto con ID 1...");
manager.deleteProduct(1);

// Verificación después de la eliminación --------------------------------------------------------
console.log("Productos después de eliminar el producto con ID 1:", manager.getProducts());
