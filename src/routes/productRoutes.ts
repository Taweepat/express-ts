import express from "express";
import { Request, Response } from "express";

interface Product {
  id: number;
  name: string;
  price: number;
}

const router = express.Router();

const products: Product[] = [];

router.get("/products", (_: Request, res: Response) => {
  res.json(products);
});


router.get("/products/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const product = products.find((p) => p.id === id);

  if (!product) {
    res.status(404).json({ error: "Product not found" });
  } else {
    res.json(product);
  }
});


router.post("/products", (req: Request, res: Response): void => {
  if (!req.body) {
    res.status(400).json({ error: "Missing product data" });
    return;
  }

  const { id, name, price } = req.body;

  if (!id || !name || !price) {
    res.status(400).json({ error: "Missing product data" });
    return;
  }

  products.push({ id, name, price });
  res.status(201).json({ message: "Product created successfully" });
});


router.put("/products/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);

  if (!req.body) {
    res.status(400).json({ error: "Missing product data" });
    return;
  }

  const { name, price } = req.body;

  const product = products.find((p) => p.id === id);

  if (!product) {
    res.status(404).json({ error: "Product not found" });
  } else {
    if (name) product.name = name;
    if (price) product.price = price;
    res.json({ message: "Product updated successfully" });
  }
});

router.delete("/products/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    res.status(404).json({ error: "Product not found" });
  } else {
    products.splice(index, 1);
    res.json({ message: "Product deleted successfully" });
  }
});


export default router;
