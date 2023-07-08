import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan  from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";
import artistRoute from "./routes/artistRoutes.js";
import memberRoute from "./routes/memberRoutes.js";
import sizeRoute from "./routes/sizeRoutes.js";
import sizepostcardRoute from "./routes/sizepostcardRoutes.js"
import productRoutes from "./routes/productRoutes.js"

import cors from "cors";
//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan(`dev`));

//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/artist', artistRoute);
app.use('/api/v1/member', memberRoute);
app.use('/api/v1/size', sizeRoute);
app.use('/api/v1/sizepostcard' , sizepostcardRoute);

//rest api
app.get('/',(req,res) => {
    res.send("<h1>Welcome to a piece of MYTH app<h1>");
});

//POST
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
    );
});
