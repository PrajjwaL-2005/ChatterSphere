import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./database/db.js";
import userRoutes from "./routes/userRoutes.js" ; 
import authRoutes from "./routes/authRoutes.js" ; 
import postRoutes from "./routes/postROutes.js" ;
import messageRoutes from './routes/messageRoutes.js' ;
import cloudinary from "cloudinary"
import cookieParser from "cookie-parser";
import { Chat } from "./models/ChatModel.js";



dotenv.config();
cloudinary.v2.config({
    cloud_name:process.env.Cloudinary_Cloud_Name,
    api_key:process.env.Cloudinary_Api,
    api_secret:process.env.Cloudinary_Secret
});

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const port = process.env.PORT;


app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);
app.use("/api/messages" , messageRoutes) ;

app.get("/chats" , isAuth , async(req,res)=>{
    try{
        const chats = await Chat.find({
            users: req.user._id , 
        }).populate({
            path: "Users" , 
            select: "name ProfilePic" ,``
        }) ;
        res.json(chats) ;
    } catch(error){
        res.status(500).json({
            message : error.message ,
        }) ;
    }
}) ;

app.listen(port , ()=>{
    console.log(`Server running at ${port}`);
    connectDb();
});