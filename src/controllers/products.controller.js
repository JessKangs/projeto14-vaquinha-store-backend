import db from '../database/db.js';

async function getProducts (req, res) {

       try {
        const response = await db.collection("products").find().toArray()
        res.send(response)
        console.log(response)
       } catch (err) {
        res.sendStatus(409)
       }

}

export default getProducts; 