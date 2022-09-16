import express from 'express'
import { addToCart, getCartList } from '../controllers/cart.controllers.js'

const router = express.Router();

router.post("/cart", addToCart)

router.get("/cart", getCartList)

export default router;