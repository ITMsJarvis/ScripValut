import React from "react";
import styled from "styled-components";
import IndexWrapper from "./IndexWrapper";
import CompanyBox from "./CompanyBox";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  padding: 0 1em;
`;

const StockHome = () => {
  const { fiftyTwoWeekHighData, fiftyTwoWeekLowData, top_losers, top_gainers } =
    useSelector((state) => state.stocks);

  return (
    <Container>
      <IndexWrapper />

      <CompanyBox
        info={{
          type: "Top Gainers",
          link: `${import.meta.env.VITE_STOCK_API}/all-top-stocks/top-gainers`,
        }}
      />

      <CompanyBox
        info={{
          type: "Top Losers",
          link: `${import.meta.env.VITE_STOCK_API}/all-top-stocks/top-losers`,
        }}
      />

      <CompanyBox
        info={{
          type: "52 Week High",
          link: `${import.meta.env.VITE_STOCK_API}/all-top-stocks/52-week-high`,
        }}
      />

      <CompanyBox
        info={{
          type: "52 Week Low",
          link: `${import.meta.env.VITE_STOCK_API}/all-top-stocks/52-week-low`,
        }}
      />
    </Container>
  );
};

export default StockHome;
