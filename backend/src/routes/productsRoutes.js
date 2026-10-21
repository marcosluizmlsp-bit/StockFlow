
const express = require("express"); // Importando o módulo Express para criar rotas e lidar com requisições HTTP
const productsController = require("../controllers/productsControllers"); // Importando o controlador de produtos que contém a lógica para lidar com as requisições relacionadas a produtos

const router = express.Router(); // Criando uma instância do roteador do Express para definir rotas específicas para produtos

router.get("/", productsController.getAllProducts); // Definindo uma rota GET para o endpoint "/api/products" que chama a função getAllProducts do controlador de produtos quando acessada
router.post("/", productsController.createProduct); // Definindo uma rota POST para o endpoint "/api/products" que chama a função createProduct do controlador de produtos quando acessada
router.get("/:id", productsController.getProductById); // Definindo uma rota GET para o endpoint "/api/products/:id" que chama a função getProductById do controlador de produtos quando acessada
router.put("/:id", productsController.updateProduct); // Definindo uma rota PUT para o endpoint "/api/products/:id" que chama a função updateProduct do controlador de produtos quando acessada
router.delete("/:id", productsController.deleteProduct);// Definindo uma rota DELETE para o endpoint "/api/products/:id" que chama a função deleteProduct do controlador de produtos quando acessada
module.exports = router; // Exportando o roteador para que possa ser usado em outros arquivos, como o app.js, onde será registrado como middleware para lidar com as rotas de produtos.
