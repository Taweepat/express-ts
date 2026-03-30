import { Request, Response } from "express";
import * as productService from "../services/productService"

export const getAllProducts = async (_: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    try {
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    
    const { name,  price } = req.body

    try {
        const product = await productService.createProduct(name, price)
        res.status(201).json(product)
    } catch (error) {
        const err = error as Error
        res.status(500).json({ 
            message: err.message 
        })
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string)
    const { name, price } = req.body

    try {
        const product = await productService.updateProduct(id, name, price)
        res.status(200).json(product)
    } catch (error) {
        const err = error as Error
        res.status(500).json({ 
            message: err.message 
        })
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string)

    try {
        const product = await productService.deleteProduct(id)
        res.status(200).json({
            message: `Product ${id} deleted`,
            product: product
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({ 
            message: err.message 
        })
    }
}