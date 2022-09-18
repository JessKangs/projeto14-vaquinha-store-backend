import express from 'express'
import hasToken from '../middlewares/auth.middleware.js'
import { addToCart, getCartList } from '../controllers/cart.controllers.js'

const router = express.Router();

router.post("/cart", hasToken, addToCart)

router.get("/cart", hasToken, getCartList)

export default router;