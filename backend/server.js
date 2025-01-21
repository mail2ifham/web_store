import express from "express";
import {connectDB} from "./config/db.js";
import productRoutes from "./router/products.route.js"
import dotenv from "dotenv";


const app = express();
app.use(express.json()) // allow to accept JSON in the req.body
app.use("/api/products",productRoutes )
dotenv.config()
const PORT=process.env.PORT || 5000 


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
