import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser";
import serverRouter from "./routes/serverRoute.js";
import cors from "cors";
import mongodbConnection from "./mongoDb/mongoDbConnection.js";

dotenv.config({
    path:"./.env"
})

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());



const PORT = process.env.PORT || 5000;

app.use(serverRouter);


app.get("/",(req,res) => {
    res.status(200).json({message : "Hello World"});
})


app.listen(PORT,()=>{
    mongodbConnection();
    console.log("Server Started!!!");
})
