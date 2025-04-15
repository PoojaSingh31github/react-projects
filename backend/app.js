import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routes/user.js";

dotenv.config();

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOURL,{});
        console.log("mongoDB connected")
    } catch (error) {
        console.log("mongo connection failed", error.message);
        process.exit(1);
    }
}
connectDB()
const app = express();
// app.use(
//     cors(
//         {
//             origin:[]
//         }
//     )
// )
const PORT = process.env.PORT || 4000;
app.get("/", (req,res)=>{
    res.status(200).json({message: "home page"})
})
app.use(express.json())

app.use("/api/user",route )

app.listen(PORT,()=>{
    console.log(`Server run on port ${PORT}`)
})

