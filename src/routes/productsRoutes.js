import express from 'express'
import getProducts from "../controllers/products.controller.js"

const router = express.Router();

router.get("/products", getProducts)

//router.post("/sign-in", createSignIn)

export default router;