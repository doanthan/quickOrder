import dotenv from "dotenv";
import connectToDatabase from "./db.js";
import express from "express";

// Our Routes
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.use;
app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
