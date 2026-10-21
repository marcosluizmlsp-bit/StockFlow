
const API_URL = "http://localhost:3000/api/products";

const productsTableBody = document.getElementById("productsTableBody");
const totalProductsElement = document.getElementById("totalProducts");
const totalUnitsElement = document.getElementById("totalUnits");
const lowStockProductsElement = document.getElementById("lowStockProducts");
const searchProductIdInput = document.getElementById("searchProductId");
const searchProductButton = document.getElementById("searchProductButton");
const showAllProductsButton = document.getElementById("showAllProductsButton");
const searchMessage = document.getElementById("searchMessage");

async function loadProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load products.");
        }

        const products = await response.json();

        renderProducts(products);
        updateDashboard(products);
    } catch (error) {
        console.error("Error loading products:", error);

        productsTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    Could not load products. Check if the API is running.
                </td>
            </tr>
        `;
    }
}

function renderProducts(products) {
    productsTableBody.innerHTML = "";

    if (products.length === 0) {
        productsTableBody.innerHTML = `
            <tr>
                <td colspan="5">No products registered.</td>
            </tr>
        `;
        return;
    }

    products.forEach((product) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = product.id;

        const codeCell = document.createElement("td");
        codeCell.textContent = product.code;

        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        const quantityCell = document.createElement("td");
        quantityCell.textContent = product.quantity;

        const minimumStockCell = document.createElement("td");
        minimumStockCell.textContent = product.minimumStock;

        row.append(
            idCell,
            codeCell,
            nameCell,
            quantityCell,
            minimumStockCell
        );

        productsTableBody.appendChild(row);
    });
}

function updateDashboard(products) {
    const totalProducts = products.length;

    const totalUnits = products.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    const lowStockProducts = products.filter((product) => {
        return product.quantity <= product.minimumStock;
    }).length;

    totalProductsElement.textContent = totalProducts;
    totalUnitsElement.textContent = totalUnits;
    lowStockProductsElement.textContent = lowStockProducts;
}

loadProducts();

const productForm = document.getElementById("productForm");
const formMessage = document.getElementById("formMessage");

productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const product = {
        code: document.getElementById("productCode").value.trim(),
        name: document.getElementById("productName").value.trim(),
        quantity: Number(document.getElementById("productQuantity").value),
        minimumStock: Number(document.getElementById("minimumStock").value)
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Could not register product.");
        }

        formMessage.textContent = "Product registered successfully!";
        productForm.reset();

        await loadProducts();
    } catch (error) {
        console.error("Error registering product:", error);
        formMessage.textContent = error.message;
    }
});
searchProductButton.addEventListener("click", async () => {
    const productId = Number(searchProductIdInput.value);

    if (!Number.isInteger(productId) || productId <= 0) {
        searchMessage.textContent = "Enter a valid product ID.";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${productId}`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Product not found.");
        }

        renderProducts([result]);

        searchMessage.textContent = `Product found: ${result.name}`;
    } catch (error) {
        console.error("Error searching for product:", error);

        productsTableBody.innerHTML = `
            <tr>
                <td colspan="5">Product not found.</td>
            </tr>
        `;

        searchMessage.textContent = error.message;
    }
});

showAllProductsButton.addEventListener("click", async () => {
    searchProductIdInput.value = "";
    searchMessage.textContent = "";

    await loadProducts();
});