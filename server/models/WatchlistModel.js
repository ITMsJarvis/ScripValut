import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    symbol: {
      type: String,
    },
    stockname: {
      type: String,
    },
    investedPrice: {
      type: Number,
    },
    marketPrice: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Active", "Sold", "Pending", "Watchlist"],
    },
    industry: {
      type: String,
    },
    sector: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("WatchList", WatchlistSchema);
