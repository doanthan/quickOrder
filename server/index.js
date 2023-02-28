import dotenv from "dotenv";
import connectToDatabase from "./db.js";
import express from "express";

// Our Routes
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
app.use("/api/products", productRoutes);

app.use;
app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
