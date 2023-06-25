import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useGetIndices } from "../customhooks/useGetIndices";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  overflow: hidden;
  border: 1px solid #e7e3e3;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  height: 3.5em;
  background-color: #e7e3e3;
  padding: 0.5em;
  gap: 3px;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  height: 3.5em;
  border-bottom: 1px solid #e7e3e3;
  padding: 0.5em;
  gap: 5px;
`;

const ColumnHeader = styled.div`
  min-width: 11.66%;
  display: flex;
  align-items: center;

  font-weight: 500;
`;
const Column = styled.div`
  min-width: 11.66%;
  display: flex;
  align-items: center;

  p {
    color: ${(props) => (props.type === "positive" ? "#4BE93B" : "red")};
  }
`;

const RowDescription = styled.div`
  min-width: 30%;
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 1em;
`;
const Description = styled.div`
  min-width: 30%;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const IndexImage = styled.img`
  width: 2em;
  height: 2em;
  border-radius: 50%;
`;

const Table = () => {
  const [IndicesData] = useGetIndices();

  const { indices, isLoading, error } = useSelector((state) => state.stocks);

  return (
    <Container>
      <TableHeader>
        <Description>Index Name</Description>
        <ColumnHeader>Last Traded</ColumnHeader>
        <ColumnHeader>Day Change</ColumnHeader>
        <ColumnHeader>High</ColumnHeader>
        <ColumnHeader>Low</ColumnHeader>
        <ColumnHeader>Open</ColumnHeader>
        <ColumnHeader>Prev. Close</ColumnHeader>
      </TableHeader>
      {indices.map((index, id) => (
        <TableRow key={id}>
          <RowDescription>
            <IndexImage src={index.logo} />
            <p>{index.name}</p>
          </RowDescription>
          <Column>{index.last_price}</Column>
          <Column>
            <p type={parseFloat(index.day_chg) > 0 ? "positive" : "negative"}>
              {index.day_chg}({index.per_chg})
            </p>
          </Column>

          <Column>{index.high}</Column>
          <Column>{index.low}</Column>
          <Column>{index.open}</Column>
          <Column>{index.pre_close}</Column>
        </TableRow>
      ))}
    </Container>
  );
};

export default Table;
