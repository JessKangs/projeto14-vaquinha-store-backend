import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI)
// const mongoClient = new MongoClient('mongodb://localhost:27017')

try {
    await mongoClient.connect();
} catch (err) {
    console.log(err.mesage);
}

    const db = mongoClient.db("test");

export default db;