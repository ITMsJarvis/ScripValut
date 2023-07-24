import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  min-width: 70%;
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
`;

const RowDescription = styled(Link)`
  min-width: 30%;
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 1em;
  text-decoration: none;
  color: #000;
`;
const Description = styled.div`
  min-width: 30%;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const WathclistTable = () => {
  const [Watchlist, setWatchList] = useState([]);

  const { userid } = useSelector((state) => state.users);

  const { pathname } = useLocation();

  useEffect(() => {
    let isSubscribed = true;

    const getData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/stocks/getwatchlist`,
          { userid: userid }
        );

        setWatchList(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribed) {
      getData();
    }

    return () => {
      isSubscribed = false;
    };
  }, [pathname]);

  return (
    <Container>
      <TableHeader>
        <ColumnHeader>SR</ColumnHeader>
        <Description>Stockname</Description>
      </TableHeader>
      {Watchlist?.map((stock, id) => (
        <TableRow key={id}>
          <Column>{id + 1}</Column>
          <RowDescription
            to={`/stock/${stock.stockname.replace(/[-()]/g, "")}`}
          >
            {stock.stockname}
          </RowDescription>
        </TableRow>
      ))}
    </Container>
  );
};

export default WathclistTable;
