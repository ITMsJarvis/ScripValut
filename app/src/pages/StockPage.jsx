import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GetCurrentStock } from "../apicalls/StockApicalls";
import styled from "styled-components";
import StockInfo from "../components/StockInfo";
import StockDescriptionBox from "../components/StockDescriptionBox";
import FinancialTable from "../components/FinancialTable";
import ToggleTableFinace from "../components/ToggleTableFinace";
import ShareHolding from "../components/ShareHolding";
import StockChart from "../components/StockChart";

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

const StockPage = () => {
  const { isLoading, error, CurrentStockData } = useSelector(
    (state) => state.stocks
  );

  const { pathname } = useLocation();
  const stock_name = pathname.split("/")[2];

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     GetCurrentStock(dispatch, stock_name);
  //   }, [stock_name]);

  return (
    <Container>
      <Left>
        <StockInfo />
      </Left>
      <Right>
        <StockChart />
        <StockDescriptionBox />
        <KeyIndicators>
          <FinancialTable />
          <ToggleTableFinace />
        </KeyIndicators>
        <ShareHolding />
      </Right>
    </Container>
  );
};

export default StockPage;
