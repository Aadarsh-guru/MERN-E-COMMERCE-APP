import mongoose from "mongoose";
import dotenv from "dotenv"

mongoose.set('strictQuery', true);

dotenv.config()

const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD

const Connection = async()=>{
    // const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-grjsyfq-shard-00-00.dmncauj.mongodb.net:27017,ac-grjsyfq-shard-00-01.dmncauj.mongodb.net:27017,ac-grjsyfq-shard-00-02.dmncauj.mongodb.net:27017/?ssl=true&replicaSet=atlas-xa5tl9-shard-0&authSource=admin&retryWrites=true&w=majority`
    const URL = 'mongodb://localhost/e-commerce'
    try {
       await mongoose.connect(URL,{ useNewUrlParser: true })
       console.log(`Connected to Database successfully`);
    } catch (error) {
        console.log('Disconnected',error);
    }
}

export default Connection;