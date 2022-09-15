import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js'
import productsRouter from './routes/productsRoutes.js'

const server = express();
server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(productsRouter)

server.listen(5000)
console.log("Ouvindo na porta 5000...")