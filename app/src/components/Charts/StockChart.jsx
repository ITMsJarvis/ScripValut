import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import OneDayChart from "./OneDayChart";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import YearChart from "./YearChart";

const socket = io("https://scoket-api-backend.onrender.com");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-height: 400px;
  border: 1px solid red;
  padding: 1em;
  gap: 2rem;
`;

const IntervalButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ccc;
  padding: 1em;
`;

const Button = styled.div`
  width: 3rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.9em;
  font-weight: 500;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4be93b;
  cursor: pointer;
`;

const StockChart = () => {
  const [activeTab, setActiveTab] = useState("1day");

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [oneDayChart, setOneDayChart] = useState([]);
  const [oneWeekChart, setOneWeekChart] = useState([]);
  const [oneMonthChart, setOneMonthChart] = useState([]);
  const [oneYearChart, setOneYearChart] = useState([]);
  const [ThreeYearChart, setThreeYearChart] = useState([]);
  const [FiveYearChart, setFiveYearChart] = useState([]);

  const { pathname } = useLocation();

  const { isLoading, error, CurrentStockData } = useSelector(
    (state) => state.stocks
  );

  const Fetchdata = (data, setFunction) => {
    for (let [key, value] of Object.entries(data)) {
      setFunction((prev) => [
        ...prev,
        { time: key, price: parseFloat(value).toFixed(3) },
      ]);
    }
  };
  const symbol = CurrentStockData["basic_info"]?.symbol.split(".")[0];
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    if (symbol && !isLoading) {
      socket.emit("join", symbol);
      socket.emit("started", symbol);
      socket.emit("oneweek", symbol);
      socket.emit("onemonth", symbol);
    }

    socket.on("started", (data) => {
      setOneDayChart((prev) => [
        ...prev,
        { time: data[0], price: parseFloat(data[1]).toFixed(3) },
      ]);

      console.log(data[0]);
    });

    socket.on("oneweek", (data) => {
      setOneWeekChart((prev) => [
        ...prev,
        { time: data[0], price: parseFloat(data[1]).toFixed(3) },
      ]);

      console.log(data[0]);
    });

    socket.on("onemonth", (data) => {
      setOneMonthChart((prev) => [
        ...prev,
        { time: data[0], price: parseFloat(data[1]).toFixed(3) },
      ]);

      console.log(data[0]);
    });

    socket.on("join", (data) => {
      console.log(data);

      Fetchdata(data[0], setOneDayChart);
      Fetchdata(data[1], setOneWeekChart);
      Fetchdata(data[2], setOneMonthChart);
      Fetchdata(data[3], setOneYearChart);
      Fetchdata(data[4], setThreeYearChart);
      Fetchdata(data[5], setFiveYearChart);
    });

    return () => {
      socket.off("join");
    };
  }, []);
  return (
    <Container>
      {isConnected ? "Connected" : "disconnected"}

      {activeTab === "1day" && <OneDayChart data={oneDayChart} />}
      {activeTab === "1week" && <OneDayChart data={oneWeekChart} />}
      {activeTab === "1month" && <OneDayChart data={oneMonthChart} />}
      {activeTab === "1year" && <YearChart data={oneYearChart} />}
      {activeTab === "3year" && <YearChart data={ThreeYearChart} />}
      {activeTab === "5year" && <YearChart data={FiveYearChart} />}
      <IntervalButton>
        <Button
          style={{ backgroundColor: activeTab === "1day" && "#4ce93b23" }}
          onClick={() => setActiveTab("1day")}
        >
          1D
        </Button>
        <Button
          style={{ backgroundColor: activeTab === "1week" && "#4ce93b23" }}
          onClick={() => setActiveTab("1week")}
        >
          1WK
        </Button>
        <Button
          style={{ backgroundColor: activeTab === "1month" && "#4ce93b23" }}
          onClick={() => setActiveTab("1month")}
        >
          1M
        </Button>
        <Button
          style={{ backgroundColor: activeTab === "1year" && "#4ce93b23" }}
          onClick={() => setActiveTab("1year")}
        >
          1Y
        </Button>
        <Button
          style={{ backgroundColor: activeTab === "3year" && "#4ce93b23" }}
          onClick={() => setActiveTab("3year")}
        >
          3Y
        </Button>
        <Button
          style={{ backgroundColor: activeTab === "5year" && "#4ce93b23" }}
          onClick={() => setActiveTab("5year")}
        >
          5Y
        </Button>
      </IntervalButton>
    </Container>
  );
};

export default StockChart;
