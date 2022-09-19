import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.js'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(productsRouter)
server.use(cartsRouter)

server.listen(process.env.PORT || 3000, () => {
    console.log(`Magic happens on ${process.env.PORT}`)
});