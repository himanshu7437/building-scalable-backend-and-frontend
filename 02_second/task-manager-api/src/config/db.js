import mongoose from 'mongoose'
import {env} from './conf.js'

export const connectDB = async() => {
    try {
        await mongoose.connect(env.mongoUri);
        console.log("Db connected Successully");
    } catch (error) {
        console.log("Error in Db connection: ", error)
        process.exit(1);
    }
}