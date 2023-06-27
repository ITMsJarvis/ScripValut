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
      large_link: "stocks/alltopstocks?category=top-gainers&index=GIDXNIFTY100",
      mid_link: "stocks/alltopstocks?category=top-gainers&index=GIDXNIFMDCP100",
      small_link:
        "stocks/alltopstocks?category=top-gainers&index=GIDXNIFSMCP100",
      filter: true,
    },
    {
      type: "Top Losers",
      large_link: "stocks/alltopstocks?category=top-losers&index=GIDXNIFTY100",
      mid_link: "stocks/alltopstocks?category=top-losers&index=GIDXNIFMDCP100",
      small_link:
        "stocks/alltopstocks?category=top-losers&index=GIDXNIFSMCP100",
      filter: true,
    },
    {
      type: "52 Week High",
      large_link: "stocks/fifty-two-week?filter=52-week-high",
      filter: false,
    },
    {
      type: "52 Week Low",
      large_link: "stocks/fifty-two-week?filter=52-week-low",
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
