import React, { useEffect } from "react";
import styled from "styled-components";
import StockViewBox from "./StockViewBox";
import { useDispatch, useSelector } from "react-redux";
import {
  GetFiftyTwoWeekHigh,
  GetFiftyTwoWeekLow,
  GetTopGainers,
  GetTopLosers,
} from "../apicalls/StockApicalls";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-top: 1em;
  gap: 1em;
  padding: 1em;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: start;
  width: 100%;
  gap: 1em;
`;

const Title = styled.h2`
  font-family: "Space grotesk";
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  overflow-x: scroll;
  scroll-behavior: smooth;
  padding: 1em;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Slider = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  transition: all 0.3s linear;
`;

const CompanyBox = (props) => {
  console.log(props.info.link);

  const dispatch = useDispatch();

  const {
    fiftyTwoWeekHighData,
    fiftyTwoWeekLowData,
    top_gainers,
    top_losers,
    isLoading,
    error,
  } = useSelector((state) => state.stocks);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Promise.race([
    //   GetTopGainers(dispatch, props.info.link === "Top Gainers", signal),
    //   GetTopLosers(dispatch, props.info.link === "Top Losers", signal),
    //   GetFiftyTwoWeekHigh(dispatch, props.info.link === "52 Week High", signal),
    //   GetFiftyTwoWeekLow(dispatch, props.info.link === "52 Week Low", signal),
    // ]).then(() => {
    //   console.log("success");
    // });

    if (props.info.type === "Top Gainers") {
      GetTopGainers(dispatch, props.info.link);
    }

    if (props.info.type === "Top Losers") {
      GetTopLosers(dispatch, props.info.link);
    }

    if (props.info.type === "52 Week High") {
      GetFiftyTwoWeekHigh(dispatch, props.info.link);
    }

    if (props.info.type === "52 Week Low") {
      GetFiftyTwoWeekLow(dispatch, props.info.link);
    }
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Container>
      <Top>
        <Title>{props.info.type}</Title>
        <Link
          to={
            props.info.type === "Top Gainers"
              ? "/market/top-gainers"
              : props.info.type === "Top Losers"
              ? "/market/top-losers"
              : props.info.type === "52 Week High"
              ? "/market/52-week-high"
              : "/market/52-week-low"
          }
          style={{ color: "#4be93b", textDecoration: "none" }}
        >
          See more
        </Link>
      </Top>
      {props.info.type === "Top Gainers" && (
        <Bottom>
          <Slider>
            {top_gainers.slice(0, 5).map((box, i) => (
              <StockViewBox key={i} {...box} />
            ))}
          </Slider>
          {top_gainers.length === 0 &&
            isLoading &&
            Array.from({ length: 5 }).map((b, i) => (
              <Skeleton height={200} width={180} />
            ))}
          {!error && !isLoading && top_gainers.length === 0 && (
            <p>No stocks top gainer today</p>
          )}
        </Bottom>
      )}
      {props.info.type === "Top Losers" && (
        <Bottom>
          <Slider>
            {top_losers.slice(0, 5).map((box, i) => (
              <StockViewBox key={i} {...box} />
            ))}
          </Slider>
          {top_losers.length === 0 &&
            isLoading &&
            Array.from({ length: 5 }).map((b, i) => (
              <Skeleton height={200} width={180} />
            ))}
          {!error && !isLoading && top_losers.length === 0 && (
            <p>No stocks top loser today</p>
          )}
        </Bottom>
      )}
      {props.info.type === "52 Week High" && (
        <Bottom>
          <Slider>
            {fiftyTwoWeekHighData.slice(0, 5).map((box, i) => (
              <StockViewBox key={i} {...box} type="week" />
            ))}
          </Slider>
          {fiftyTwoWeekHighData.length === 0 &&
            isLoading &&
            Array.from({ length: 5 }).map((b, i) => (
              <Skeleton height={200} width={180} />
            ))}
          {!error && !isLoading && fiftyTwoWeekHighData.length === 0 && (
            <p>No stocks touch 52 week high today</p>
          )}
        </Bottom>
      )}
      {props.info.type === "52 Week Low" && (
        <Bottom>
          <Slider>
            {fiftyTwoWeekLowData.slice(0, 5).map((box, i) => (
              <StockViewBox key={i} {...box} type="week" />
            ))}
          </Slider>
          {fiftyTwoWeekLowData.length === 0 &&
            isLoading &&
            Array.from({ length: 5 }).map((b, i) => (
              <Skeleton height={200} width={180} />
            ))}

          {!error && !isLoading && fiftyTwoWeekLowData.length === 0 && (
            <p>No stocks touch 52 week low today</p>
          )}
        </Bottom>
      )}
    </Container>
  );
};

export default CompanyBox;
