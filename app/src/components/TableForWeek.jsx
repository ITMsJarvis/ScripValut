import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  overflow: hidden;
  border: 1px solid #e7e3e3;
  max-height: 70vh;
  overflow-y: scroll;

  &::-webkit-scrollbar-button {
    width: 10px;
    background-color: red;
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  height: 3.5em;
  background-color: #e7e3e3;
  padding: 0.5em;
  gap: 3px;
  position: sticky;
  top: 0;
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
`;

const RowDescription = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 1em;
`;
const Description = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const TableForWeek = ({ ...props }) => {
  return (
    <Container>
      <TableHeader>
        <Description>Company Name</Description>
        <ColumnHeader>
          Price <small> ₹</small>
        </ColumnHeader>
        <ColumnHeader>Day High</ColumnHeader>
      </TableHeader>
      {props.data?.map((stocks, i) => (
        <TableRow key={i}>
          <RowDescription>{stocks.companyName}</RowDescription>
          <Column>{stocks.currentPrice}</Column>
          <Column>{stocks.day_high}</Column>
        </TableRow>
      ))}
    </Container>
  );
};

export default TableForWeek;
