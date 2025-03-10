import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./database/db.js";
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/postROutes.js"
import cloudinary from "cloudinary"
import cookieParser from "cookie-parser";



dotenv.config();
cloudinary.v2.config({
    cloud_name:process.env.Cloudinary_Cloud_Name,
    api_key:process.env.Cloudinary_Api,
    api_secret:process.env.Cloudinary_Secret
});

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);



app.listen(port , ()=>{
    console.log(`Server running at ${port}`);
    connectDb();
});