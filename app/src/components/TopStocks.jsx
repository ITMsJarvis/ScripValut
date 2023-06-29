import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import StockViewBox from "./StockViewBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { publicRequest } from "../apiRequest";
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
  align-items: ${(props) => props.type === "false" && "center"};
  justify-content: ${(props) => props.type === "false" && "space-between"};
  flex-direction: ${(props) => (props.type === "true" ? "column" : "row")};
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
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  gap: 1em;
  transition: all 0.3s linear;
`;

const Arrow = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  position: absolute;
  left: ${(props) => props.direction === "left" && 0};
  right: ${(props) => props.direction === "right" && 0};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: #4be93b;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
`;

const FilterButton = styled.div`
  height: 1.8em;
  border: 1px solid #cecece;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
  padding: 10px;
  border-radius: 0.8em;
  cursor: pointer;
`;

const TopStocks = ({ ...props }) => {
  const sliderRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [TopStocks, setTopStocks] = useState(null);
  const [TopMidCap, setTopMidCap] = useState(null);
  const [TopSmallCap, setTopSmallCap] = useState(null);
  const [activeFilter, setActiveFilter] = useState("large");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const scrollLeft = () => {
    const check = -translateX;
    if (check < sliderRef.current.offsetWidth) {
      setTranslateX((prev) => prev - 500);
    }
  };

  const scrollRight = () => {
    if (translateX < 0) {
      setTranslateX((prev) => prev + 500);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      try {
        const result = await publicRequest.get(`${props.large_link}`);

        console.log(result.data);

        if (props.mid_link && props.small_link) {
          const mid_result = await publicRequest.get(`${props.mid_link}`);

          const small_results = await publicRequest.get(`${props.small_link}`);
          setTopMidCap(mid_result.data);
          setTopSmallCap(small_results.data);
        }

        setIsLoading(false);
        setTopStocks(result.data);
      } catch (e) {
        setIsLoading(false);
        setError(true);
      }
    };

    getData();

    return () => {
      controller.abort();
    };
  }, []);

  console.log(TopStocks);

  return (
    <Container>
      <Top type={props.filter ? "true" : "false"}>
        <Title>{props.type}</Title>
        {props.filter ? (
          <Filters>
            <FilterButton
              highlight={activeFilter}
              onClick={() => setActiveFilter("large")}
              style={{
                color: activeFilter === "large" && "#4BE93B",
                border: activeFilter === "large" && "1px solid #4BE93B",
              }}
            >
              Large
            </FilterButton>
            <FilterButton
              highlight={activeFilter}
              onClick={() => setActiveFilter("mid")}
              style={{
                color: activeFilter === "mid" && "#4BE93B",
                border: activeFilter === "mid" && "1px solid #4BE93B",
              }}
            >
              Mid
            </FilterButton>
            <FilterButton
              highlight={activeFilter}
              onClick={() => setActiveFilter("small")}
              style={{
                color: activeFilter === "small" && "#4BE93B",
                border: activeFilter === "small" && "1px solid #4BE93B",
              }}
            >
              Small
            </FilterButton>
          </Filters>
        ) : (
          <Link
            to={
              props.type === "52 Week High"
                ? "/market/52-week-high"
                : props.type === "52 Week Low"
                ? "/market/52-week-low"
                : null
            }
            style={{ textDecoration: "none", color: "#4BE93B" }}
          >
            see more
          </Link>
        )}
      </Top>

      {activeFilter === "large" && (
        <Bottom>
          <Arrow direction="left" onClick={() => scrollRight()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Arrow>
          <Arrow direction="right" onClick={() => scrollLeft()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Arrow>
          <Slider
            ref={sliderRef}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {TopStocks !== null
              ? TopStocks.map((stocks, i) => (
                  <StockViewBox key={i} {...stocks} />
                ))
              : Array.from({ length: 8 }).map((s, i) => (
                  <Skeleton key={i} width={160} height={180} />
                ))}
          </Slider>
        </Bottom>
      )}

      {activeFilter === "mid" && (
        <Bottom>
          <Arrow direction="left" onClick={() => scrollRight()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Arrow>
          <Arrow direction="right" onClick={() => scrollLeft()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Arrow>
          <Slider
            ref={sliderRef}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {TopMidCap?.map((stocks, i) => (
              <StockViewBox key={i} {...stocks} />
            ))}
          </Slider>
        </Bottom>
      )}

      {activeFilter === "small" && (
        <Bottom>
          <Arrow direction="left" onClick={() => scrollRight()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Arrow>
          <Arrow direction="right" onClick={() => scrollLeft()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Arrow>
          <Slider
            ref={sliderRef}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {TopSmallCap?.map((stocks, i) => (
              <StockViewBox key={i} {...stocks} />
            ))}
          </Slider>
        </Bottom>
      )}
    </Container>
  );
};

// min-width: 10rem;
//   min-height: 180px;

export default TopStocks;
