import dotenv from "dotenv";
import connectToDatabase from "./db.js";
import express from "express";

// Our Routes
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { Server } from "socket.io";
import Stripe from "stripe";

dotenv.config();
connectToDatabase();
const app = express();
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET);

const port = process.env.PORT || 5000;

app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  let lineItems = [];
  req.body.map((item) => {
    lineItems.push({
      price: item.stripePriceId,
      quantity: item.qty,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `https://localhost:3000`,
    cancel_url: `http://localhost:3000/cart`,
  });

  res.send(JSON.stringify({ url: session.url }));
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.use;
var server = app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
const io = new Server(server);
