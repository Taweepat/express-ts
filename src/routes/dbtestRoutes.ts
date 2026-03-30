import express from "express";
import { Request, Response } from "express";
import pool from "../utils/db";

const router = express.Router();

router.get("/db", async (_: Request, res: Response) => {
    try {
        const client = await pool.connect();
        await client.query("SELECT NOW()");
        client.release();
        res.status(200).json({ 
            message : 'Database connection successful'
        });
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ 
            message : 'Database connection failed',
            error: "Failed to connect to database" });
    }
});

export default router;