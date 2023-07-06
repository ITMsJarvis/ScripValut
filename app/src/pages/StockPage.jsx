import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GetCurrentStock } from "../apicalls/StockApicalls";
import styled from "styled-components";
import StockInfo from "../components/StockInfo";
import StockDescriptionBox from "../components/StockDescriptionBox";
import FinancialTable from "../components/FinancialTable";
import ToggleTableFinace from "../components/ToggleTableFinace";
import StockChart from "../components/Charts/StockChart";
import { Player } from "@lottiefiles/react-lottie-player";
import Performance from "../components/StockPageComponents/Performance";
import Fundamentals from "../components/StockPageComponents/Fundamentals";
import Financials from "../components/StockPageComponents/Financials";
import AboutStock from "../components/StockPageComponents/AboutStock";
import ShareHolding from "../components/StockPageComponents/ShareHolding";

const Container = styled.div`
  display: flex;
  width: 70%;
  padding: 0 1em;
  border: 1px solid red;
  position: relative;
  gap: 1em;
  margin-top: 2em;
`;

const Left = styled.div`
  flex: 1;
  /* border: 1px solid red; */
  min-height: 30%;
  position: sticky;
`;

const Right = styled.div`
  flex: 2.5;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const KeyIndicators = styled.div`
  display: flex;
  gap: 1em;
`;

const Loader = styled.iframe`
  width: 100%;
  height: 100vh;
  outline: none;
  border: none;
`;

const StockPage = () => {
  const { isLoading, error, CurrentStockData } = useSelector(
    (state) => state.stocks
  );

  const { pathname } = useLocation();
  const stock_name = pathname.split("/")[2];
  const stock_code = pathname.split("/")[3];

  const dispatch = useDispatch();

  console.log(stock_name);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    GetCurrentStock(dispatch, stock_name, stock_code, signal);
    // window.location.reload();

    return () => {
      controller.abort();
    };
  }, []);

  if (CurrentStockData.length === 0) {
    return <h1>Loading....</h1>;
  } else {
    return (
      <Container>
        <Left>
          <StockInfo />
        </Left>
        <Right>
          <StockChart />
          <Performance />
          <Fundamentals />
          <Financials />
          <AboutStock />
          <ShareHolding />
          {/* <StockDescriptionBox />
            <KeyIndicators>
              <FinancialTable />
              <ToggleTableFinace />
            </KeyIndicators>
            <ShareHolding /> */}
        </Right>
      </Container>
    );
  }
};

export default StockPage;
