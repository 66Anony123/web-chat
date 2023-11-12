import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      {/* here maybe  inside of  <BiPowerOff /> component there is a tag called button so maybe styling in here is fluently working */}
      <BiPowerOff />
    </Button>
  );
}

export default Logout;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.5rem;
    color: black;
  }
`;
