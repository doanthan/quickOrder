import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";

const getProducts = async (req, res) => {
  console.log(req.query.slug);
  const products = await Product.find({ slug: req.query.slug });
  res.json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
};

//create a product
const createNewProduct = asyncHandler(async (req, res) => {
  const {
    brand,
    name,
    category,
    stock,
    price,
    image,
    productIsNew,
    description,
    slug,
  } = req.body;

  const stripe = Stripe(process.env.STRIPE_SECRET);
  const product = await stripe.products.create({
    name,
    active: true,
    description,
    images: [image],
    metadata: { storeId: req.user.storeId.toString() },
  });

  const stripePrice = await stripe.prices.create({
    currency: "aud",
    product: product.id,
    unit_amount: price * 100,
    active: true,
    metadata: { storeId: req.user.storeId.toString() },
  });

  const newProduct = await Product.create({
    brand,
    name,
    category,
    stock,
    price,
    image,
    productIsNew,
    description,
    stripeProductId: product.id,
    stripePriceId: stripePrice.id,
    storeId: req.user.storeId,
    slug,
  });
  await newProduct.save();
  console.log("slug");
  console.log(slug);
  //TODO I think the find products doesn't work
  const products = await Product.find({});

  if (newProduct) {
    console.log("test");
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product could not be uploaded.");
  }
});
// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
//update a product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    brand,
    name,
    image,
    category,
    stock,
    price,
    id,
    productIsNew,
    description,
  } = req.body;

  const product = await Product.findById(id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.image = "/images/" + image;
    product.category = category;
    product.stock = stock;
    product.productIsNew = productIsNew;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

export {
  getProducts,
  getProduct,
  createNewProduct,
  deleteProduct,
  updateProduct,
};
