import React from "react";
import styled from "styled-components";
import IndexWrapper from "./IndexWrapper";
import CompanyBox from "./CompanyBox";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  padding: 0 1em;
`;

const StockHome = () => {
  return (
    <Container>
      <IndexWrapper />

      <CompanyBox
        info={{
          type: "Top Gainers",
          link: "https://my-stock-api.onrender.com/topstocks/top-gainers?limit=200",
        }}
      />
      <CompanyBox
        info={{
          type: "Top Losers",
          link: "https://my-stock-api.onrender.com/topstocks/top-losers?limit=200",
        }}
      />
      <CompanyBox
        info={{
          type: "52 Week High",
          link: "https://my-stock-api.onrender.com/topstocks/52-week-high?limit=200",
        }}
      />
      <CompanyBox
        info={{
          type: "52 Week Low",
          link: "https://my-stock-api.onrender.com/topstocks/52-week-low?limit=200",
        }}
      />
    </Container>
  );
};

export default StockHome;
