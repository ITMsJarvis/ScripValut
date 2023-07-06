import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #44475b;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #2bd301;
  gap: 1em;
  padding: 1em;
`;

const Logo = styled.img`
  flex: 1;
  width: 1rem;
  border-radius: 50%;
`;

const Title = styled.div`
  flex: 4;

  h2 {
    font-weight: 600;
    font-size: 1.3em;
  }
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const IndexName = styled.div`
  width: 80px;
  height: 30px;
  border-radius: 30px;
  background-color: #2bcd2b;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  font-weight: 600;
  color: white;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-top: 1em;
  padding: 0.5em 0;
  border-bottom: 1px solid #cacaca;

  h1 {
    font-weight: 800;
    font-size: 1.4em;
  }

  p {
    font-size: 0.8em;
    font-weight: 800;
  }
`;

const Analysis = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-top: 1em;
  padding: 0.5em 0;
  border-bottom: 1px solid #cacaca;

  div {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border: 1px solid #4be94b;
    width: 100px;
    padding: 0.5em;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid #cdcdcd;
`;

const Button = styled.div`
  width: 48%;
  padding: 0.5em;
  border-radius: 20px;
  background-color: ${(props) =>
    props.type === "buy" ? "#19b086" : "#eb1f1f"};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StockInfo = () => {
  const { isLoading, error, CurrentStockData } = useSelector(
    (state) => state.stocks
  );

  if (isLoading) {
    // Render loading state or placeholder
    return <Skeleton style={{ width: "100%", height: "300px" }} />;
  }

  if (error) {
    // Render error state or error message
    return <div>Error: {error}</div>;
  }

  if (!CurrentStockData) {
    // Render null or placeholder when CurrentStockData is not available
    return null;
  }

  const priceChange = (
    CurrentStockData["basic_info"]["currentPrice"] -
    CurrentStockData["basic_info"]["regularMarketPreviousClose"]
  ).toFixed(2);

  console.log(CurrentStockData["basic_info"]["longName"]);
  return (
    <Container>
      <Top>
        {/* <Logo src={CurrentStockData["basic_info"]["logoName"]} /> */}
        <Title>
          <h2>{CurrentStockData["basic_info"]["longName"]}</h2>
        </Title>
      </Top>
      <PriceSection>
        <IndexName>NSE</IndexName>
        <Price>
          <h1>₹ {CurrentStockData["basic_info"]["currentPrice"]}</h1>
          <p style={{ color: priceChange > 0 ? "green" : "red" }}>
            ₹ {priceChange}
          </p>
        </Price>
        <Analysis>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {CurrentStockData["basic_info"]["recommendationKey"]}
          </div>
        </Analysis>
        <Buttons>
          <Button type="buy">BUY</Button>
          <Button type="sell">SELL</Button>
        </Buttons>
      </PriceSection>
    </Container>
  );
};

export default StockInfo;
