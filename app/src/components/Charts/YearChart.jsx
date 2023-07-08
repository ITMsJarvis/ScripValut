import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

const Container = styled.div`
  width: "100%";
  height: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const YearChart = (props) => {
  let Return =
    (props.data[props.data?.length - 1]?.price - props.data[0]?.price) /
    props.data[0]?.price;

  console.log(Return * 100);

  const Total = (Return * 100).toFixed(2);
  return (
    <Container>
      <ResponsiveContainer>
        <LineChart data={props.data}>
          {/* <CartesianGrid strokeDasharray="5 3" /> */}
          <XAxis dataKey="number" hide="true" />
          <YAxis
            hide="true"
            name="price"
            domain={[
              (dataMin) => 0 - Math.abs(dataMin),
              (dataMax) => dataMax * 2,
            ]}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            dot={false}
            strokeWidth={3}
            stroke={"#4be93b"}
          />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ fontWeight: "500" }}>Total Return: {Total}%</p>
    </Container>
  );
};

export default YearChart;
