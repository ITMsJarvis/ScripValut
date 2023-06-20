import mongoose, { model } from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stocks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
      },
    ],
    mutualFund: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MutualFund",
      },
    ],
    fixedDeposit: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FixedDeposit",
      },
    ],
    bankAccount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", PortfolioSchema);
