import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB Connected: ${conn.connection.host}`);
        
    } catch (err) {
        console.error(`Error:${err.message}`);
        process.exit(1) // process code 1, means exit with error, 0 mean success
        
    }
};

