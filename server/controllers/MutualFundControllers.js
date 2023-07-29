import MutualFund from "../models/MutualFundModel.js";
import User from "../models/UserModel.js";
import axios from "axios";

export const OneTimeInvestMent = async (req, res) => {
  const {
    userid,
    fundName,
    units,
    schemetype,
    investedAmount,
    nav,
    status,
    code,
    frequency,
    sipdate,
  } = req.body;

  const existingFunds = await MutualFund.findOne({
    userid: userid,
    fundName: fundName,
  });

  // const previousNav = existingFunds.nav;
  // const currentNav = parseFloat(nav);
  // const sipAmount = parseInt(investedAmount);
  // const unitsPurchased = sipAmount / currentNav;
  // console.log(previousNav);
  // console.log(currentNav);
  // console.log(sipAmount);
  // console.log(unitsPurchased);

  try {
    if (existingFunds) {
      const previousNav = existingFunds.nav;
      const currentNav = parseFloat(nav);
      const sipAmount = parseInt(investedAmount);
      const unitsPurchased = sipAmount / currentNav;

      existingFunds.units = parseFloat(existingFunds.units) + unitsPurchased;
      existingFunds.investedAmount =
        parseInt(existingFunds.investedAmount) + sipAmount;
      existingFunds.nav = currentNav;
      existingFunds.status = status;
      existingFunds.sipdate = sipdate;

      console.log("hello");

      await existingFunds.save();
    } else {
      const newFund = new MutualFund({
        userid,
        fundName,
        units,
        schemetype,
        investedAmount,
        nav,
        status,
        code,
        frequency,
        sipdate,
      });

      await newFund.save();
    }

    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const totalInvestment = investedAmount;
    if (user.walletbalance < totalInvestment) {
      return res.status(400).send("Insufficient funds");
    }

    user.walletbalance -= totalInvestment;
    await user.save();

    res.status(200).send(`${fundName} is purchased`);
  } catch (e) {
    res.status(500).send("Something went wrong....");
  }
};

export const GetAllMF = async (req, res) => {
  const userid = req.body.userid;

  console.log(userid);

  let MarketPrices = [];

  try {
    const result = await MutualFund.find({ userid: userid });

    for (let mf of result) {
      console.log(mf.fundName);
      // const response = await axios.get(
      //   `https://my-stock-api.onrender.com/get-mutual-fund/${mf.fundName}/${mf.code}`
      // );

      // console.log(response.data);

      // let firstPair = Object.entries(response.data[0].data)[0];

      // MarketPrices.push(firstPair[1]);
    }

    // const FinalData = result.map((stock, i) => {
    //   return { ...stock, marketPrice: MarketPrices[i] };
    // });

    res.status(200).send("hello");
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};
