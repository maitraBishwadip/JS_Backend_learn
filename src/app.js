import express from "express";
import cors from "cors";
import cookiePewser from "cookie-parser";


const app = express();

app.use(cors({

    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true


    //Todo : Whitellisting





}));

//Input sanitization
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true, limit: "10kb"}));
app.use(express.static("public"));
app.use(cookiePewser());






export {app};