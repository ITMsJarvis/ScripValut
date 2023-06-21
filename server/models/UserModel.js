import mongoose from "mongoose";
import Portfolio from "./PortFolioModel.js";
import WatchList from "./WatchlistModel.js";
import AddressSchema from "./AddressSchema.js";

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
      type: [AddressSchema.schema],
      default: [],
    },
    portfolio: {
      type: [Portfolio.schema],
      default: [],
    },
    watchlist: {
      type: [WatchList.schema],
      default: [],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
