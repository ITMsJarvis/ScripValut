import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2em;
  }
`;

const Title = styled.h4`
  font-size: 1em;
`;

const Holder = styled.p`
  font-weight: 500;
`;

const Line = styled.div`
  width: ${(props) => props.type === "Promoters" && `${props.width}%`};
  width: ${(props) =>
    props.type === "Foreign institutions" && `${props.width}%`};
  width: ${(props) =>
    props.type === "Other domestic institutions" && `${props.width}%`};
  width: ${(props) => props.type === "Retail and other" && `${props.width}%`};
  width: ${(props) => props.type === "Mutual Funds" && `${props.width}%`};
  height: 0.5em;
  background-color: #4be93b;
`;

const Value = styled.p``;

const ShareHolding = () => {
  return (
    <Container>
      <Title>Share Holding Pattern</Title>
      <Box>
        <Holder>Promoters</Holder>
        <div>
          <Line type="Promoters" width={51.5} />
          <Value>51.5</Value>
        </div>
      </Box>
      <Box>
        <Holder>Foreign institutions</Holder>
        <div>
          <Line type="Foreign institutions" width={6.91} />
          <Value>6.91</Value>
        </div>
      </Box>
      <Box>
        <Holder>Other domestic institutions </Holder>
        <Line type="Other domestic institutions" width={29.29} />
      </Box>
      <Box>
        <Holder>Retail and other</Holder>
        <Line type="Retail and other" width={10.05} />
      </Box>
      <Box>
        <Holder>Mutual Funds</Holder>
        <Line type="Mutual Funds" width={2.25} />
      </Box>
    </Container>
  );
};

export default ShareHolding;
