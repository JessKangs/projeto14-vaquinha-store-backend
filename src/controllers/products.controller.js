import db from '../database/db.js';

async function getProducts (req, res) {

       try {
        const response = await db.collection("products").find().toArray()
       
        res.send(response)
       } catch (err) {
        res.status(409).send("Não foi possível listar produtos")
       }

}

export default getProducts; 