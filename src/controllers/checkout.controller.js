import db from '../database/db.js'

async function finishBuying (req, res) {
    const token = res.locals.token;
    const data = req.body;
    
    const resposta = await db.collection("sessions").findOne({ token })

    try {
        console.log('eeh')
        const response = await db.collection("buys").insertOne({ userId: resposta.userId, productsId: data.productsId })

        await db.collection("carts").deleteMany({ userId: resposta.userId})

        res.send(response)
    } catch (err) {
        res.status(401)
    }
}


export { finishBuying }