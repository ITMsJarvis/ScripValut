import React, { useState } from "react";
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
  justify-content: space-between;
  min-height: 4em;
  border-bottom: 1px solid #cdcdcd;
  background-color: #f5f5f5;
  flex-direction: column;
  gap: 1em;

  h4 {
    padding: 1em;
  }
`;

const Toggles = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 0.9em;
`;

const Button = styled.div`
  padding: 0.5em;
  cursor: pointer;
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

const Profitablity = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.5s linear;
  padding: 0.5em;
`;

const Operational = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.5s linear;
  padding: 0.5em;
`;

const Valuation = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.5s linear;
  padding: 0.5em;
`;

const ToggleTableFinace = () => {
  const [show, SetShow] = useState("profit");

  const handleToggle = (type) => {
    SetShow(type);
  };

  return (
    <Container>
      <Header>
        <div>
          <h4>Finance ratio</h4>
        </div>

        <Toggles>
          <Button
            style={{ borderBottom: show === "profit" && "2px solid #000" }}
            onClick={() => handleToggle("profit")}
          >
            Profitablity
          </Button>
          <Button
            style={{ borderBottom: show === "operation" && "2px solid #000" }}
            onClick={() => handleToggle("operation")}
          >
            Operational
          </Button>
          <Button
            style={{ borderBottom: show === "valuation" && "2px solid #000" }}
            onClick={() => handleToggle("valuation")}
          >
            Valuation
          </Button>
        </Toggles>
      </Header>
      {show === "profit" && (
        <Profitablity>
          <Row>
            <Index>Profit Margin</Index>
            <Value>2.3%</Value>
          </Row>
          <Row>
            <Index>Profit Margin</Index>
            <Value>2.3%</Value>
          </Row>
          <Row>
            <Index>Profit Margin</Index>
            <Value>2.3%</Value>
          </Row>
          <Row>
            <Index>Profit Margin</Index>
            <Value>2.3%</Value>
          </Row>
        </Profitablity>
      )}

      {show === "operation" && (
        <Operational>
          <Row>
            <Index>Profit Margin-ope</Index>
            <Value>2.3%</Value>
          </Row>
          <Row>
            <Index>Profit Margin</Index>
            <Value>2.3%</Value>
          </Row>
          <Row>
            <Index>Profit Margin</Index>
            <Value>2.3%</Value>
          </Row>
          <Row>
            <Index>Profit Margin</Index>
            <Value>2.3%</Value>
          </Row>
        </Operational>
      )}
      {show === "valuation" && (
        <Valuation>
          <Row>
            <Index>Profit Margin-val</Index>
            <Value>2.3%</Value>
          </Row>
          <Row>
            <Index>Profit Margin</Index>
            <Value>2.3%</Value>
          </Row>
          <Row>
            <Index>Profit Margin</Index>
            <Value>2.3%</Value>
          </Row>
          <Row>
            <Index>Profit Margin</Index>
            <Value>2.3%</Value>
          </Row>
        </Valuation>
      )}
    </Container>
  );
};

export default ToggleTableFinace;
