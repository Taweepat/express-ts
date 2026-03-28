import express from "express";
import { Request, Response } from "express";
const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello, World!");
});

router.get("/about", (_: Request, res: Response) => {
  res.send("About Us!");
});

router.get("/contact", (_: Request, res: Response) => {
  res.send("Contact Us!");
});

export default router;
