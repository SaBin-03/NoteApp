import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser";
import serverRouter from "./routes/serverRoute.js";
import cors from "cors";
import mongodbConnection from "./mongoDb/mongoDbConnection.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Instead of app.options("*"), use this more compatible version:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});


app.use(express.json());
app.use(cookieParser());



console.log("CORS ALLOWING ORIGIN:", process.env.FRONTEND_URL);
const PORT = process.env.PORT || 5000;

app.use("/api",serverRouter);


app.get("/",(req,res) => {
    res.status(200).json({message : "Hello World"});
})


app.listen(PORT,()=>{
    mongodbConnection();
    console.log("Server Started!!!");
})
