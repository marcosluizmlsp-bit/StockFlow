
const productsService = require("../services/productsService"); // Importando o serviço de produtos que contém a lógica de negócios para lidar com operações relacionadas a produtos

function getAllProducts(req, res) { // Definindo a função getAllProducts que será chamada quando a rota GET para "/api/products" for acessada
    const products = productsService.getAllProducts();

    res.status(200).json(products);
}

function createProduct(req, res) {
    try {
        const product = productsService.createProduct(req.body);

        res.status(201).json(product);
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                error: "Product code already exists."
            });
        }

        if (error.message.startsWith("Product ") ||
            error.message.startsWith("Quantity ") ||
            error.message.startsWith("Minimum stock ")) {
            return res.status(400).json({
                error: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            error: "Internal server error."
        });
    }
}
    function getProductById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const product = productsService.getProductById(id);

            if (!product) {
                return res.status(404).json({
                    error: `Product with ID ${id} not found.`
                });
            }

              return res.status(200).json(product);
    } catch (error) {
        if (error.message === "Product ID must be a positive integer.") {
            return res.status(400).json({
                error: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            error: "Internal server error."
        });
    }
}
function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const product = productsService.updateProduct(id, req.body);

        if (!product) {
            return res.status(404).json({
                error: `Product with ID ${id} not found.`
            });
        }

        return res.status(200).json(product);
    } catch (error) {
        if (
            error.message === "Product ID must be a positive integer." ||
            error.message === "Product code is required." ||
            error.message === "Product name is required." ||
            error.message === "Quantity must be a non-negative integer." ||
            error.message === "Minimum stock must be a non-negative integer."
        ) {
            return res.status(400).json({
                error: error.message
            });
        }

        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                error: "Product code already exists."
            });
        }

        console.error(error);
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}
function deleteProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const result = productsService.deleteProduct(id);

        if (!result) {
            return res.status(404).json({
                error: `Product with ID ${id} not found.`
            });
        }

        return res.status(204).send();
    } catch (error) {
        if (error.message === "Product ID must be a positive integer.") {
            return res.status(400).json({
                error: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            error: "Internal server error."
        });
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};