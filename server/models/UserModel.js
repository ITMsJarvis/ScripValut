import mongoose from "mongoose";
import Portfolio from "./PortFolioModel.js";
import WatchList from "./WatchlistModel.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    mobileNumber: {
      type: Array,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    dob: {
      type: Date,
    },
    address: {
      type: Array,
      default: [],
    },
    walletbalance: {
      type: Number,
      default: 100000,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
