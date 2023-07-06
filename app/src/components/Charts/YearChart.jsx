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
  width: 100%;
  min-height: 400px;
`;

const YearChart = (props) => {
  return (
    <Container>
      <ResponsiveContainer>
        <LineChart data={props.data}>
          {/* <CartesianGrid strokeDasharray="5 3" /> */}
          <XAxis dataKey="time" hide="true" />
          <YAxis hide="true" domain={[0, "dataMax + 1000"]} name="Price" />
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
    </Container>
  );
};

export default YearChart;
