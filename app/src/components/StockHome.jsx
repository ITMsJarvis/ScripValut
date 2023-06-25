import React from "react";
import styled from "styled-components";
import IndexWrapper from "./IndexWrapper";

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
    </Container>
  );
};

export default StockHome;
