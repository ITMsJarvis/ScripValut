import puppeteer from "puppeteer";
// import StockList from "../data/stocks.json" assert { type: "json" };
import mongoose from "mongoose";
import axios from "axios";
//Get Indices

export const GetIndices = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://groww.in/indices");

    const title = await page.title();

    console.log(title);

    const indicesLogo = await page.$$eval(
      ".valign-wrapper .lazyload-wrapper .companyLogo_companyImage__bT0On",
      (e) => e.map((ele) => ele.src)
    );

    const indicesName = await page.$$eval(
      ".AllIndicesDataTableBodyRow_name__ESNse .valign-wrapper",
      (e) => e.map((e) => e.innerText)
    );

    const indicesLastTraded = await page.$$eval("td:nth-child(2)", (e) =>
      e.map((e) => e.innerText)
    );

    const indicesdayChange = await page.$$eval("td:nth-child(3) .fs14", (e) =>
      e.map((e) => e.innerText.split("(")[0])
    );

    console.log(indicesdayChange);

    const indicesdayChangePer = await page.$$eval(
      "td:nth-child(3) .fs14",
      (e) => e.map((e) => e.innerText.split("(")[1].split(")")[0])
    );

    console.log(indicesdayChangePer);

    const indicesHigh = await page.$$eval("td:nth-child(4)", (e) =>
      e.map((e) => e.innerText)
    );

    const indicesLow = await page.$$eval("td:nth-child(5)", (e) =>
      e.map((e) => e.innerText)
    );

    const indicesOpen = await page.$$eval("td:nth-child(6)", (e) =>
      e.map((e) => e.innerText)
    );

    const indicesPrevClose = await page.$$eval("td:nth-child(7)", (e) =>
      e.map((e) => e.innerText)
    );

    const indian_indices = [];

    for (let i = 0; i < indicesName.length; i++) {
      indian_indices.push({
        logo: indicesLogo[i],
        name: indicesName[i],
        last_price: indicesLastTraded[i],
        day_chg: indicesdayChange[i],
        per_chg: indicesdayChangePer[i],
        high: indicesHigh[i],
        low: indicesLow[i],
        open: indicesOpen[i],
        pre_close: indicesPrevClose[i],
      });
    }

    await browser.close();

    res.status(200).send(indian_indices);
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

  console.log(category);
  console.log(index);

  console.log(`https://groww.in/markets/${category}?index=${index}`);

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(`https://groww.in/markets/${category}?index=${index}`);

    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll(
        ".fs14.mtp438RowDiv.cur-po.pos-rel"
      );

      const rowData = [];
      rows.forEach((row) => {
        const companyName = row.querySelector(
          ".fs14.mtp438CompanyName"
        ).textContent;
        const currentPrice = row
          .querySelector(".fw500")
          .innerText.split("\n")[0];
        const per_chg = row.querySelector(".fw500").innerText.split("\n")[1];
        const previousClose = row.querySelector(
          ".tb10Td:nth-child(4)"
        ).textContent;
        const dayHigh = row.querySelector(".tb10Td:nth-child(5)").textContent;

        rowData.push({
          companyName,
          currentPrice,
          per_chg,
          previousClose,
          dayHigh,
        });
      });

      return rowData;
    });
    await browser.close();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};

export const AllSectorData = async (req, res) => {
  const sector = req.query.sector;

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(
      `https://www.moneycontrol.com/india/stockmarket/sector-classification/marketstatistics/nse/${sector}`
    );

    const title = await page.title();

    const category = await page.evaluate(() => {
      const rows = document.querySelectorAll(".tbldata14 tbody tr");

      const data = [];

      rows.forEach((c, id) => {
        const company_name = c.querySelector(
          "td:nth-child(1) .bl_12 b"
        )?.innerText;

        const link = c.querySelector("td:nth-child(1) .bl_12")?.href;

        console.log(link);

        const industry = c.querySelector("td:nth-child(2) .bl_12")?.innerText;

        const last_price = c.querySelector("td:nth-child(3)")?.innerText;

        const change = c.querySelector("td:nth-child(4)")?.innerText;

        const per_chg = c.querySelector("td:nth-child(5)")?.innerText;

        const mark_cap = c.querySelector("td:nth-child(6)")?.innerText;

        data.push({
          company_name,
          industry,
          last_price,
          change,
          per_chg,
          mark_cap,
          link,
        });
      });

      return data;
    });
    // console.log(title);

    res.status(200).send(category);

    await browser.close();
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
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(`https://ticker.finology.in/market/${filter}`);

    const title = await page.title();

    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll("tr");

      const list = [];

      rows.forEach((row) => {
        const companyName = row.querySelector("td:nth-child(2)")?.innerText;

        const currentPrice = row.querySelector("td:nth-child(3)")?.innerText;

        const day_high = row.querySelector("td:nth-child(4)")?.innerText;
        list.push({ companyName, currentPrice, day_high });
      });

      return list;
    });

    await browser.close();

    res.status(200).send(data.splice(2));
  } catch (e) {
    res.status(500).send("Somethinh went wrong");
  }
};
