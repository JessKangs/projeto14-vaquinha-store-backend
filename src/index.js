import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.js'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'

const server = express();
server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(productsRouter)
server.use(cartsRouter)

server.listen(5000)
console.log("Ouvindo na porta 5000...")