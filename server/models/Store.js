import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abn: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: "true",
    },
    totalSales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;
