import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("address", AddressSchema);
