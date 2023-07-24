import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faArrowRightFromBracket,
  faChevronDown,
  faChevronUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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
  position: relative;

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
  position: relative;
  cursor: pointer;

  div {
  }

  img {
    width: 25%;
  }
`;

const ProfileLogo = styled.div`
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
`;

const Results = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #4be94b;
  border-radius: 0.5em;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.155);
  background-color: #ffff;
  z-index: 10;
`;

const Result = styled(Link)`
  width: 100%;
  min-height: 3em;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  gap: 2em;
  text-decoration: none;
  color: #000;
`;

const ProfileDropDown = styled.div`
  min-width: 12em;
  display: ${(props) => (props.show === "true" ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 100%;
  border-radius: 0.5em;
  padding: 0.5em;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.155);
  background-color: #fff;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }

  p {
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.1em;
  }
`;

const Navbar = () => {
  const { pathname } = useLocation();

  const [searchInput, setSearchInput] = useState("");

  const [StockList, setStockList] = useState([]);

  const [showProfile, setShowProfile] = useState(false);

  const HandleSearch = async (e) => {
    setSearchInput(e.target.value);

    try {
      if (searchInput?.length > 4) {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/stocks/searchstocks?stockname=${
            e.target.value
          }`
        );

        console.log(res.data);

        if (res.data.length > 0) {
          setStockList(res.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

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
            <input
              value={searchInput}
              type="text"
              onChange={(e) => HandleSearch(e)}
            />
            {StockList?.length > 0 && searchInput?.length > 0 && (
              <Results>
                {StockList?.map((stock, id) => (
                  <Result
                    key={id}
                    to={`/stock/${stock.name.replace(/[-()]/g, "")}`}
                    onClick={() => setStockList([])}
                  >
                    <p>{stock.name}</p>
                    <h4>{stock.symbol}</h4>
                  </Result>
                ))}
              </Results>
            )}
          </SearchBar>
        </CenterRight>
      </Center>
      <Right>
        <Profile>
          <ProfileLogo>
            <h1>AK</h1>
          </ProfileLogo>
          {!showProfile ? (
            <FontAwesomeIcon
              onClick={() => setShowProfile(!showProfile)}
              icon={faChevronDown}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => setShowProfile(!showProfile)}
              icon={faChevronUp}
            />
          )}

          {/* <img
            src="../../public/chevron-down.svg"
            onClick={() => setShowProfile(!showProfile)}
          /> */}
          <ProfileDropDown show={showProfile ? "true" : "false"}>
            <div>
              <FontAwesomeIcon icon={faAddressCard} />
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "1.1em",
                  color: "black",
                  height: "2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                to="/profile"
              >
                Profile
              </Link>
            </div>
            <div>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <p>Logout</p>
            </div>
          </ProfileDropDown>
        </Profile>
      </Right>
    </Container>
  );
};

export default Navbar;
