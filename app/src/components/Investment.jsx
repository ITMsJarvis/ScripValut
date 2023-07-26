import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InstrumentTabs from "./InstrumentTabs";
import Portfolio from "./Portfolio";
import WathclistTable from "./WathclistTable";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios, { Axios } from "axios";
import { mobile } from "../responsive";

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
  /* flex-grow: 1;
  flex-shrink: 0; */
  overflow-x: scroll;
  ${mobile({ width: "80%" })}

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Investment = () => {
  const [MyinvestMent, setMyInvestMent] = useState(0);

  const [MyBalance, setMyBalance] = useState(0);

  const { userid } = useSelector((state) => state.users);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/stocks/getAllstocks`,
          { userid: userid }
        );

        console.log(res.data);

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

    let intervalId = setTimeout(getData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isSubscription = true;

    const getData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/stocks/getBalance`,
          { userid: userid }
        );

        console.log(res.data);

        const balance = Number(res.data.walletbalance).toFixed(1);

        setMyBalance(balance);
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscription) {
      getData();
    }

    return () => {
      isSubscription = false;
    };
  }, []);

  console.log(MyBalance);
  console.log(MyinvestMent);

  return (
    <Container>
      <InstrumentTabs />
      <InvestMentBox>
        <Title>
          My Total Investments ₹{(MyinvestMent.toFixed(1) / 1000).toFixed(2)}K
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
            <p>₹ 0 k</p>
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
              ₹ {((MyinvestMent + Number(MyBalance)) / 1000).toFixed(2)} k
            </h1>
          </Box>
        </AssestBox>
      </InvestMentBox>
      <h1>Portfolio</h1>
      <SliderComponent>
        <Portfolio />
      </SliderComponent>

      <h1>Watchlist </h1>
      <WathclistTable />
    </Container>
  );
};

export default Investment;
