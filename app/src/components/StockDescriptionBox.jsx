import React from "react";
import styled from "styled-components";
import FinancialTable from "./FinancialTable";
import ToggleTableFinace from "./ToggleTableFinace";
import ShareHolding from "./ShareHolding";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #cccc;
  border-radius: 10px;
  overflow: hidden;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 1em;
  gap: 1em;

  h4 {
  }

  p {
    font-size: 0.9em;
    line-height: 1.5;
    font-weight: 500;
    color: #707070;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4em;
  padding: 0.5em;
  border-bottom: 1px solid #cdcdcd;
`;

const Index = styled.p`
  font-size: 0.9em;
  font-weight: 500;
  color: #525252;
`;

const Value = styled.p`
  font-size: 0.9em;
  font-weight: 500;
`;

const KeyIndicators = styled.div`
  display: flex;
  gap: 1em;
`;

const StockDescriptionBox = () => {
  return (
    <Container>
      <Top>
        <h4>Indian Oil Corp Ltd Quick Overview</h4>
        <p>
          ndian Oil Corporation Limited is an India-based oil company. The
          Company's segments include Petroleum Products, Petrochemicals and
          Other Business Activities. Its Other Business Activities segment
          includes gas, oil and gas exploration activities, explosives and
          cryogenic business, and wind mill and solar power generation. Its
          business interests span the entire hydrocarbon value-chain ranging
          from refining, pipeline transportation and marketing, to exploration
          and production of crude oil and gas, petrochemicals, gas marketing,
          alternative energy sources and globalization of downstream operations.
          It has a network of fuel stations, bulk storage terminals, inland
          depots, aviation fuel stations, liquefied petroleum gas (LPG) bottling
          plants and lube blending plants. It also has set up approximately 257
          electric vehicle (EV) charging stations and 29 battery swapping
          stations at its energy pumps across the country. It owns and operates
          approximately nine refineries across India.
        </p>
      </Top>
      <Bottom>
        <Box>
          <Index>Market Cap</Index>
          <Value>128,926.90 Crore</Value>
        </Box>
        <Box>
          <Index>Open</Index>
          <Value>₹ 90.95</Value>
        </Box>
        <Box>
          <Index>Market Cap</Index>
          <Value>128,926.90 Crore</Value>
        </Box>
        <Box>
          <Index>Market Cap</Index>
          <Value>128,926.90 Crore</Value>
        </Box>
        <Box>
          <Index>Market Cap</Index>
          <Value>128,926.90 Crore</Value>
        </Box>
      </Bottom>
    </Container>
  );
};

export default StockDescriptionBox;
