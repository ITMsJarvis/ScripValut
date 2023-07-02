import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #323131;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #2bd301;
`;

const Logo = styled.img`
  flex: 1;
  width: 1rem;
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
    font-weight: 600;
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
  return (
    <Container>
      <Top>
        <Logo src="https://assets.upstox.com/content/dam/aem-content-integration/assets/images/logos/IOC/square_IOC_com.png" />
        <Title>
          <h2>Indian oil share price</h2>
        </Title>
      </Top>
      <PriceSection>
        <IndexName>NSE</IndexName>
        <Price>
          <h1>₹ 91.30</h1>
          <p>+0.65 (+0.72%)</p>
        </Price>
        <Analysis>
          <div>64% Buy</div>
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
