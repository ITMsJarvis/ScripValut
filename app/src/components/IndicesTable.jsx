import React from "react";
import styled from "styled-components";
import Table from "./Table";

const Container = styled.div`
  width: 70%;
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-top: 1em;
  gap: 2em;
`;

const Title = styled.h2`
  font-family: "Space grotesk";
`;

const IndicesTable = () => {
  return (
    <Container>
      <Title>All Indices</Title>
      <Table />
    </Container>
  );
};

export default IndicesTable;
