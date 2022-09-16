import db from '../database/db.js' // conexão com o banco de dados;
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import joi from "joi"
// aqui vai as funções de login e cadastro

const signUpSchema = joi.object({
    name: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

async function createSignUp(req, res) {
    const { name, email, password } = req.body
    const validation = signUpSchema.validate({ name, email, password }, { abortEarly: true })

    if (validation.error) {
        console.log(validation.error.details)
        res.status(422).send(validation.error)
    }

    try {
        const validate = await db.collection('users').find({ email: email }).toArray()
        const passwordHash = bcrypt.hashSync(password, 10);

        if (validate.length === 0) {
            const response = await db.collection('users').insertOne({ name, email, password: passwordHash })
            res.status(201).send("Ok!")
        } else {
            res.status(409).send("Usuário já cadastrado!")
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.required()
})

async function createSignIn(req, res) {
    const { email, password } = req.body
    const validation = loginSchema.validate({ email, password }, { abortEarly: true })

    if (validation.error) {
        console.log(validation.error.details)
        res.status(422).send(validation.error)
    }

    try {
        const user = await db.collection('users').find({ email: email }).toArray()
        const passwordIsValid = bcrypt.compareSync(password, user[0].password)

        if (user && passwordIsValid) {
            const token = uuid();
            await db.collection('sessions').insertOne({ userId: user[0]._id, token })

            res.status(201).send({ name: user[0].name, email, token })
        } else {
            res.status(409).send("usuário não encontrado")
        }

    } catch (error) {
        res.status(422).send(error)
    }
}

export { createSignUp, createSignIn }



