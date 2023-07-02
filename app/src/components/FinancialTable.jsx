import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #cccc;
  border-radius: 10px;
  overflow: hidden;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4em;
  padding: 0.5em;
  border-bottom: 1px solid #cdcdcd;
  background-color: #f5f5f5;
`;

const Row = styled.div`
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

const FinancialTable = () => {
  return (
    <Container>
      <Header>
        <h4>Indian Oil Corp Ltd Key Indicators</h4>
      </Header>
      <div style={{ padding: "0.5em" }}>
        <Row>
          <Index>PE Ratio</Index>
          <Value>0.98</Value>
        </Row>
        <Row>
          <Index>PE Ratio</Index>
          <Value>0.98</Value>
        </Row>
        <Row>
          <Index>PE Ratio</Index>
          <Value>0.98</Value>
        </Row>
        <Row>
          <Index>PE Ratio</Index>
          <Value>0.98</Value>
        </Row>
        <Row>
          <Index>PE Ratio</Index>
          <Value>0.98</Value>
        </Row>
        <Row>
          <Index>PE Ratio</Index>
          <Value>0.98</Value>
        </Row>
      </div>
    </Container>
  );
};

export default FinancialTable;
