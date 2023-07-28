import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import TradingViewWidget from "../components/TickerWidget";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <TradingViewWidget />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Home;
