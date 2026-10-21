
const productsRepository = require("../repositories/productsRepository");

function getAllProducts() {
    return productsRepository.findAll();
}

function createProduct(product) {
    if (!product.code || !product.code.trim()) {
        throw new Error("Product code is required.");
    }

    if (!product.name || !product.name.trim()) {
        throw new Error("Product name is required.");
    }

    if (!Number.isInteger(product.quantity) || product.quantity < 0) {
        throw new Error("Quantity must be a non-negative integer.");
    }

    if (
        !Number.isInteger(product.minimumStock) ||
        product.minimumStock < 0
    ) {
        throw new Error("Minimum stock must be a non-negative integer.");
    }

    return productsRepository.create({
        code: product.code.trim(),
        name: product.name.trim(),
        quantity: product.quantity,
        minimumStock: product.minimumStock
    });
}

function getProductById(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Product ID must be a positive integer.");
    }

    const product = productsRepository.findById(id);

    if (!product) {
        return null;
    }

    return product;
}

function updateProduct(id, product) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Product ID must be a positive integer.");
    }

    if (!product.code || !product.code.trim()) {
        throw new Error("Product code is required.");
    }

    if (!product.name || !product.name.trim()) {
        throw new Error("Product name is required.");
    }

    if (!Number.isInteger(product.quantity) || product.quantity < 0) {
        throw new Error("Quantity must be a non-negative integer.");
    }

    if (
        !Number.isInteger(product.minimumStock) ||
        product.minimumStock < 0
    ) {
        throw new Error("Minimum stock must be a non-negative integer.");
    }

    const existingProduct = productsRepository.findById(id);

    if (!existingProduct) {
        return null;
    }

    return productsRepository.update(id, {
        code: product.code.trim(),
        name: product.name.trim(),
        quantity: product.quantity,
        minimumStock: product.minimumStock
    });
}

function deleteProduct(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Product ID must be a positive integer.");
    }

    const existingProduct = productsRepository.findById(id);

    if (!existingProduct) {
        return null;
    }

    return productsRepository.remove(id);
}
module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
