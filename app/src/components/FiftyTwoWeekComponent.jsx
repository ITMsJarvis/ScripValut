import React, { useEffect } from "react";
import styled from "styled-components";
import { FiftyWeekData } from "../apicalls/StockApicalls";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TableForWeek from "./TableForWeek";

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

const FiftyTwoWeekComponent = () => {
  const { fiftyTwoWeekHighData, fiftyTwoWeekLowData, isLoading, error } =
    useSelector((state) => state.stocks);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const status = pathname.split("/")[2];

  console.log(status);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = () => {
      if (status === "52-week-high") {
        FiftyWeekData(dispatch, "high", signal);
      } else if (status === "52-week-low") {
        FiftyWeekData(dispatch, "low", signal);
      }
    };

    getData();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Container>
      <Title>
        {status === "52-week-high" ? "52 Week High" : "52 Week Low"}
      </Title>
      <p>
        Following is the list of companies for 52 Week
        {status === "52-week-high" ? " high" : " low"} as of today
      </p>
      {status === "52-week-high" ? (
        <TableForWeek data={fiftyTwoWeekHighData} />
      ) : (
        <TableForWeek data={fiftyTwoWeekLowData} />
      )}
    </Container>
  );
};

export default FiftyTwoWeekComponent;
