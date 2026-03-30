import pool from "../utils/db";
import Product from "../models/productModel";

interface IProduct {
    id: number;
    name: string;
    price: number;
}

export const getAllProducts = async () => {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM products ORDER BY id");
    client.release();
    return result.rows.map((row) => new Product(row.id, row.name, row.price));
}

export const getProductById = async (id: number) => {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM products WHERE id = $1", [id]);
    client.release();
    return result.rows.length > 0 ? new Product(result.rows[0].id, result.rows[0].name, result.rows[0].price) : null;
}

export const createProduct = async (name: string, price: number): Promise<IProduct> => {

    const client = await pool.connect()
    const result =  await client.query('INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *', [name, price])
    client.release()

    return new Product(
        result.rows[0].id, 
        result.rows[0].name,
        result.rows[0].price
    )
}

// สร้างฟังก์ชันชื่อ updateProduct
export const updateProduct = async (id: number, name: string, price: number): Promise<IProduct> => {
    const client = await pool.connect()
    const result = await client.query('UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *', [name, price, id])
    client.release()

    if (result.rows.length === 0) {
        throw new Error(`Product with id ${id} not found`)
    }

    return new Product(
        result.rows[0].id, 
        result.rows[0].name,
        result.rows[0].price
    )
}

// สร้างฟังก์ชันชื่อ deleteProduct
export const deleteProduct = async (id: number): Promise<Product> => {
    const client = await pool.connect()
    const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *', [id])
    client.release()

    if (result.rowCount === 0) {
        throw new Error(`Product with id ${id} not found`)
    }

    return new Product(
        result.rows[0].id, 
        result.rows[0].name,
        result.rows[0].price
    )
}