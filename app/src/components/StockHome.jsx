import React from "react";
import styled from "styled-components";
import IndexWrapper from "./IndexWrapper";
import TopStocks from "./TopStocks";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  padding: 0 1em;
`;

const StockHome = () => {
  const TopDataCategory = [
    {
      type: "Top Gainers",
      large_link:
        "https://my-stock-api.onrender.com/topstocks/top-gainers/GIDXNIFTY100",
      mid_link:
        "https://my-stock-api.onrender.com/topstocks/top-gainers/GIDXNIFMDCP100",
      small_link:
        "https://my-stock-api.onrender.com/topstocks/top-gainers/GIDXNIFSMCP100",
      filter: true,
    },
    {
      type: "Top Losers",
      large_link:
        "https://my-stock-api.onrender.com/topstocks/top-losers/GIDXNIFTY100",
      mid_link:
        "https://my-stock-api.onrender.com/topstocks/top-losers/GIDXNIFMDCP100",
      small_link:
        "https://my-stock-api.onrender.com/topstocks/top-losers/GIDXNIFSMCP100",
      filter: true,
    },
    {
      type: "52 Week High",
      large_link:
        "https://my-stock-api.onrender.com/fifty-two-week-data/52-week-high",
      filter: false,
    },
    {
      type: "52 Week Low",
      large_link:
        "https://my-stock-api.onrender.com/fifty-two-week-data/52-week-low",
      filter: false,
    },
  ];

  return (
    <Container>
      <IndexWrapper />
      {TopDataCategory.map((category, i) => (
        <TopStocks key={i} {...category} />
      ))}
    </Container>
  );
};

export default StockHome;
