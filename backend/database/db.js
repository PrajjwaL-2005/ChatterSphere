import mongoose from "mongoose";

export const connectDb = async()=>{
    try{
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDb");
    }catch(error){
        console.log(error);
    }
}