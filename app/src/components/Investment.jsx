import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InstrumentTabs from "./InstrumentTabs";
import Portfolio from "./Portfolio";
import WathclistTable from "./WathclistTable";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios, { Axios } from "axios";
import { mobile } from "../responsive";
import MutualFundPortfolio from "./MutualFundPortfolio";
import { userRequest } from "../apiRequest";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 2em;
`;

const InvestMentBox = styled.div`
  min-width: 70%;
  border: 1px solid #ccc;
  padding: 1em;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1em;
  border-radius: 0.5em;
`;

const Title = styled.h2`
  font-weight: 500;
`;

const AssestBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2em;
`;

const Box = styled.div`
  min-width: 3em;
  flex-direction: column;
  gap: 0.6em;
  padding: 0.8em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 100%;
    width: 50%;
  }

  p {
    font-weight: 600;
  }
`;

const SliderComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 70%;
  overflow-x: scroll;
  ${mobile({ width: "80%" })}

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Investment = () => {
  const [MyinvestMent, setMyInvestMent] = useState(0);

  const [MFInvestMent, setMFInvestMent] = useState(0);

  const [MyBalance, setMyBalance] = useState(0);

  const { userid } = useSelector((state) => state.users);

  const { pathname } = useLocation();

  useEffect(() => {
    let isSubscribe = true;

    const getData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/stocks/getAllstocks/${userid}`,
          {
            userid: userid,
          }
        );

        const data = res.data;

        let totalInvestMent = data.reduce(
          (acc, val) => acc + val.marketPrice * val.totalQuantity,
          0
        );
        setMyInvestMent(totalInvestMent);
      } catch (e) {
        console.log(e);
      }
    };

    const delayGetData = () => {
      setTimeout(getData, 5000);
    };

    if (MyinvestMent.length === 0) {
      delayGetData();
    }

    let intervalId = setInterval(getData, 60000);

    return () => {
      clearInterval(intervalId);
      isSubscribe = false;
    };
  }, [pathname]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res1 = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/mutualfund/getAllMF`,
          { userid: userid }
        );

        const data1 = res1.data;

        console.log(data1);

        let TotalMfInvestment = data1.reduce(
          (acc, val) => acc + val.marketPrice * val.units,
          0
        );

        setMFInvestMent(TotalMfInvestment);
      } catch (e) {
        console.log(e);
      }
    };

    if (MFInvestMent.length === 0) {
      getData();
    }

    let intervalId = setInterval(getData, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [pathname]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userRequest.post(`/stocks/getBalance/${userid}`, {
          userid: userid,
        });

        const balance = Number(res.data.walletbalance).toFixed(1);

        setMyBalance(balance);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [pathname]);

  return (
    <Container>
      <InstrumentTabs />
      <small style={{ color: "#2759e5" }}>
        Note : Details will take some time to load please wait for few seconds
      </small>
      <InvestMentBox>
        <Title>
          My Total Investments ₹
          {((MyinvestMent + MFInvestMent) / 1000).toFixed(2)}K
        </Title>
        <AssestBox>
          <Box>
            <img src="../../Stocks.png" />
            <h3>Stocks</h3>
            <p>₹ {(MyinvestMent.toFixed(1) / 1000).toFixed(2)} k</p>
          </Box>
          <Box>
            <img src="../../mutualfund.png" />
            <h3>Mutual Funds</h3>
            <p>₹ {(MFInvestMent.toFixed(1) / 1000).toFixed(2)} k</p>
          </Box>
        </AssestBox>
      </InvestMentBox>

      <InvestMentBox>
        <Title>My Total Bank Balance ₹{(MyBalance / 1000).toFixed(2)}K</Title>
        <AssestBox>
          <Box>
            <img src="../../bank.png" />
            <h3>Bank Balance</h3>
            <p>₹ {(MyBalance / 1000).toFixed(2)} k</p>
          </Box>
        </AssestBox>
      </InvestMentBox>
      <InvestMentBox>
        <Title>My NetWorth</Title>
        <AssestBox>
          <Box>
            <h1>
              ₹{" "}
              {(
                (MyinvestMent + MFInvestMent + Number(MyBalance)) /
                1000
              ).toFixed(2)}{" "}
              k
            </h1>
          </Box>
        </AssestBox>
      </InvestMentBox>
      <h1>Stock Portfolio</h1>
      <SliderComponent>
        <Portfolio />
      </SliderComponent>
      <h1>Mutual Fund Portfolio</h1>
      <SliderComponent>
        <MutualFundPortfolio />
      </SliderComponent>

      <h1>Watchlist </h1>
      <WathclistTable id="watchlist" />
    </Container>
  );
};

export default Investment;
