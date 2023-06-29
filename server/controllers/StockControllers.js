import puppeteer from "puppeteer";
// import StockList from "../data/stocks.json" assert { type: "json" };
import mongoose from "mongoose";
import axios from "axios";
//Get Indices

export const GetIndices = async (req, res) => {
  try {
    const response = await axios.get(
      "https://my-stock-api.onrender.com/allindices"
    );

    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send("Sonething went wrong");
  }
};

//All Top gainers, losers,by volumes, 52W high, 52W low

export const AllTopstocksAllCap = async (req, res) => {
  const category = req.query.category;

  //category list = top-gainers,top-losers,top-volume,52-week-high,52-week-low

  const index = req.query.index;

  //index list = GIDXNIFTY100-large,GIDXNIFTY500,GIDXNIFMDCP100-mid,GIDXNIFSMCP100-small

  try {
    const response = await axios.get(
      `https://my-stock-api.onrender.com/topstocks/${category}/${index}`
    );
    res.status(200).send(response.data);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};

export const AllSectorData = async (req, res) => {
  const sector = req.query.sector;

  try {
    const response = await axios.get(
      `https://stock-new-api.onrender.com/sector-wise-data?sector=${sector}`
    );
    res.status(200).send(response.data);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};

//Add complete list of stocks from json file
// export const AddStocks = async (req, res) => {
//   const arrayOfObjects = StockList.data;

//   try {
//     const collection = mongoose.connection.collection("stocksdetails");
//     collection.insertMany(arrayOfObjects, (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send(err);
//       } else {
//         console.log("Objects inserted successfully!");
//         console.log(result);
//         res.status(200).send("Success");
//       }
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).send(e);
//   }
// };

export const GetStockDetails = async (req, res) => {
  const stockName = req.query.stock_name;
  console.log(stockName);

  try {
    const stock = await mongoose.connection
      .collection("stocksdetails")
      .find({ name: { $eq: stockName } })
      .toArray();

    const stock_symbol = stock[0]?.symbol;

    console.log(stock_symbol);

    console.log(
      `https://telescope-stocks-options-price-charts.p.rapidapi.com/stocks/${stock_symbol}.NS`
    );

    if (stock_symbol) {
      const options = {
        method: "GET",
        url: `https://telescope-stocks-options-price-charts.p.rapidapi.com/stocks/${stock_symbol}.NS`,
        params: {
          modules: "assetProfile,summaryProfile,price",
        },
        headers: {
          "X-RapidAPI-Key": `${process.env.RapidAPI_KEY}`,
          "X-RapidAPI-Host": `${process.env.RapidAPI_HOST}`,
        },
      };

      const response = await axios.request(options);
      res.status(200).send(response.data.quoteSummary.result[0]);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

export const Get52WeekSummary = async (req, res) => {
  const filter = req.query.filter;

  try {
    const response = await axios.get(
      `https://my-stock-api.onrender.com/fifty-two-week-data/${filter}`
    );

    res.status(200).send(response.data);
  } catch (e) {
    res.status(500).send("Somethinh went wrong");
  }
};
