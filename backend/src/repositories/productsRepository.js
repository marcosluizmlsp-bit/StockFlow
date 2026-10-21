
const db = require("../database/database");

function findAll() {
    const query = `
        SELECT
            id,
            code,
            name,
            quantity,
            minimum_stock AS minimumStock,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM products
        ORDER BY id DESC
    `;

    return db.prepare(query).all();
}

function create(product){
    const query = 
`
        INSERT INTO products (code, name, quantity, minimum_stock)
        VALUES (@code, @name, @quantity, @minimumStock)
    `;

    const resulto = db.prepare(query).run({
        code: product.code,
        name: product.name,
        quantity: product.quantity,
        minimumStock: product.minimumStock
    })
    return db.prepare("SELECT * FROM products WHERE id = ?").get(resulto.lastInsertRowid);
}

function findById(id) {
    const query = `
        SELECT
            id,
            code,
            name,
            quantity,
            minimum_stock AS minimumStock,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM products
        WHERE id = ?
    `;

    return db.prepare(query).get(id);
}

function update(id, product) {
    const query = `
        UPDATE products
        SET
            code = ?,
            name = ?,
            quantity = ?,
            minimum_stock = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    db.prepare(query).run(
        product.code,
        product.name,
        product.quantity,
        product.minimumStock,
        id
    );

    return findById(id);
}
function remove(id) {
    const query = `
        DELETE FROM products
        WHERE id = ?
    `;

    return db.prepare(query).run(id);
}
 module.exports = {
    findAll,
    create,
    findById,
    update,
    remove
}       


