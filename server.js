import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import collectionRotes from "./routes/collectionRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import artistRoutes from "./routes/artistRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import preproductRoutes from "./routes/preproductRoutes.js";
import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/collectiongroup", collectionRotes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/artist", artistRoutes);
app.use("/api/v1/member", memberRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/orders", authRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/preproduct",preproductRoutes)



//rest api
app.get("/", (req, res) => {
res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
    .white
);
});