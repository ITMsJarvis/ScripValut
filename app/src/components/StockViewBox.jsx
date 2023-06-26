import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

const Container = styled.div`
  min-width: 10rem;
  min-height: 180px;
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div`
  display: flex;

  flex-direction: column;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 3px;
  }
`;

const AddStockButton = styled(FontAwesomeIcon)`
  color: #4be93b;
  font-size: 1.5em;
  display: ${(props) => (props.show === true ? "block" : "none")};
`;

const StockName = styled.h4`
  width: fit-content;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
`;

const Price = styled.p`
  font-weight: 500;
`;
const PriceChange = styled.p`
  font-size: 0.9em;
`;

const StockViewBox = ({ ...props }) => {
  const [ShowAddbutton, setShowAddbutton] = useState(false);

  const HandleHover = () => {
    setShowAddbutton(true);
  };

  const HandleLeave = () => {
    setShowAddbutton(false);
  };

  console.log(props);

  return (
    <Container
      onMouseOver={() => HandleHover()}
      onMouseLeave={() => HandleLeave()}
    >
      <Top>
        <div>
          <img
            src="https://assets-netstorage.groww.in/stock-assets/logos/NSE.png"
            alt=""
          />
          <AddStockButton show={ShowAddbutton} icon={faPlusCircle} />
        </div>

        <StockName>
          {props.companyName.length > 20
            ? `${props.companyName.slice(0, 10)}...`
            : props.companyName}
        </StockName>
      </Top>

      <Bottom>
        <Price>{props.currentPrice}</Price>
        <PriceChange
          style={{
            color:
              parseFloat(props.per_chg.replace(",", "")) > 0 ? "green" : "red",
          }}
        >
          {props.per_chg}
        </PriceChange>
      </Bottom>
    </Container>
  );
};

export default StockViewBox;
