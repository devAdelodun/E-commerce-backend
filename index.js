import dotenv from "dotenv";
import express from "express";
import cookieparser from "cookie-parser"


import authRoute from "./route/authRoute.js"
import errorHandler from "./middleware/errorHandler.js";
import connect from "./dbConnect/connection.js";

dotenv.config();


connect();
const app = express();

app.use(express.json());
app.use(cookieparser());
app.use("/api/auth", authRoute);

const port = process.env.PORT || 3000;




app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});
