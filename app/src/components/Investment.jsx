import React from "react";
import styled from "styled-components";
import InstrumentTabs from "./InstrumentTabs";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Investment = () => {
  return (
    <Container>
      <InstrumentTabs />
    </Container>
  );
};

export default Investment;
