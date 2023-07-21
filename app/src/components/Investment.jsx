import React from "react";
import styled from "styled-components";
import InstrumentTabs from "./InstrumentTabs";
import Portfolio from "./Portfolio";

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

const Investment = () => {
  return (
    <Container>
      <InstrumentTabs />
      <InvestMentBox>
        <Title>My Total Investments ₹37.57K</Title>
        <AssestBox>
          <Box>
            <img src="../../Stocks.png" />
            <h3>Stocks</h3>
            <p>₹ 32.1 k</p>
          </Box>
          <Box>
            <img src="../../mutualfund.png" />
            <h3>Mutual Funds</h3>
            <p>₹ 32.1 k</p>
          </Box>
        </AssestBox>
      </InvestMentBox>

      <InvestMentBox>
        <Title>My Total Bank Balance ₹76.57K</Title>
        <AssestBox>
          <Box>
            <img src="../../bank.png" />
            <h3>Bank Balance</h3>
            <p>₹ 32.1 k</p>
          </Box>
        </AssestBox>
      </InvestMentBox>
      <InvestMentBox>
        <Title>My NetWorth</Title>
        <AssestBox>
          <Box>
            <h1>₹ 32.1 k</h1>
          </Box>
        </AssestBox>
      </InvestMentBox>
      <h1>PortFolio</h1>
      <Portfolio />
    </Container>
  );
};

export default Investment;
