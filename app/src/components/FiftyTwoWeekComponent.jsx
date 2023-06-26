import React, { useEffect } from "react";
import styled from "styled-components";
import { FiftyWeekData } from "../apicalls/StockApicalls";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

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
      <Title>All Indices</Title>
    </Container>
  );
};

export default FiftyTwoWeekComponent;
