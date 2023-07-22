import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  min-width: 70%;
  min-height: 70px;
  padding: 0 1em;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  height: 100%;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  flex: 3;
  height: 100%;
  gap: 1em;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  height: 100%;
`;

const Navigator = styled(Link)`
  color: ${(props) => (props.active === "true" ? "#4BE93B" : "#000")};
  font-size: 1.2rem;
  font-family: "Space Grotesk";
  font-weight: 700;
  text-decoration: none;
`;

const CenterLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1em;
`;

const CenterRight = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const SearchBar = styled.div`
  width: 28.125rem;
  height: 2.375rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  display: flex;

  img {
    flex: 1;
    padding: 0.2em;
  }
  input {
    flex: 9;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    padding: 0.6em;
    font-size: 1em;

    &:focus {
      outline: 2px solid #4be94b;
    }
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  max-width: 50%;

  div {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 48px;
    background: #4be94b;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 2em;
      font-family: "Space Grotesk";
    }
  }

  img {
    width: 25%;
  }
`;

const Navbar = () => {
  const { pathname } = useLocation();

  const [searchInput, setSearchInput] = useState("");

  const [StockList, setStockList] = useState([]);

  return (
    <Container>
      <Left>
        <Logo />
      </Left>
      <Center>
        <CenterLeft>
          <Navigator
            active={pathname === "/explore" ? "true" : "false"}
            to="/explore/stocks"
          >
            Explore
          </Navigator>
          <Navigator
            active={pathname === "/investment" ? "true" : "false"}
            to="/investment"
          >
            Investment
          </Navigator>
        </CenterLeft>
        <CenterRight>
          <SearchBar>
            <img src="../../public/search.svg" />
            <input type="text" />
          </SearchBar>
        </CenterRight>
      </Center>
      <Right>
        <Profile>
          <div>
            <h1>AK</h1>
          </div>
          <img src="../../public/chevron-down.svg" />
        </Profile>
      </Right>
    </Container>
  );
};

export default Navbar;
