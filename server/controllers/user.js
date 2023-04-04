import User from "../models/User.js";
import Order from "../models/Order.js";
import Store from "../models/Store.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import mongoose from "mongoose";

//TODO: redefine expiresIn
const genToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "15d" });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOneAndUpdate({ email }, { lastLogin: Date.now() })
    .populate("storeId")
    .exec();
  console.log(user);

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      store: user.storeId,
    });
  } else {
    res.status(401).send("Invalid Email or Password");
    throw new Error("User not found.");
  }
});

// POST register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, storeName } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    //TO DO Create a new store for same email here
    res.status(400).send("We already have an account with that email address.");
  } else {
    //slugify the store name
    const store = new Store({ name: storeName });
    store.slug = slugify(storeName);
    const savedStore = await _saveStore(store, 0, res);
    const user = await User.create({
      name,
      email,
      password,
      storeId: mongoose.Types.ObjectId(savedStore._id),
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(400).send("We could not register you.");
      throw new Error(
        "Something went wrong. Please check your data and try again."
      );
    }
  }
});

//slugify the store record
const _saveStore = async (store, number, res) => {
  console.log("_saveStore Hit");
  if (number !== 0) {
    store.slug += `${number}`;
  }
  try {
    const createdStore = store.save();
    return createdStore;
  } catch (e) {
    if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
      console.log("recurring save");
      const add = number + 1;
      store.slug = slugify(`${slug}`, {
        lower: true,
        replacement: "",
      });
      return _saveProfile(profile, add, res);
    }
    return res.status(422).send(e.message);
  }
};

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),
      createdAt: updatedUser.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404);
    throw new Error("This user could not be found.");
  }
});

export {
  loginUser,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserOrders,
};
