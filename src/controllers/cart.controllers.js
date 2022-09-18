import { calculateObjectSize, ObjectId } from 'bson';
import db from '../database/db.js'

async function addToCart (req, res) {
    const token = res.locals.token;
    const { productData } = req.body;

    const resposta = await db.collection("sessions").findOne({ token })

    console.log(resposta)

    try {
        const response = await db.collection('carts').insertOne({
            userId: resposta.userId,
            productData
        })
    } catch (err) {
        res.status(401)
    }
}

async function getCartList (req, res) {
    const token = res.locals.token;
    
    const resposta = await db.collection("sessions").findOne({ token })


    try {
        
        const response = await db.collection("carts").find({ userId: resposta.userId }).toArray()

        console.log(response)
        res.send(response)
    } catch (err) {
        res.status(401)
    }
}

export { addToCart, getCartList }