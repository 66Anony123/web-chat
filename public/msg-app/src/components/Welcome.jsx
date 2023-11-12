import React, { useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <div>
      <Container>
        <img src={Robot} alt="Robo" />
        <h2>
          Welcome, <span>{currentUser?.username}</span>
        </h2>
        <h4>Please Select A chaaat to Commence your message</h4>
      </Container>
    </div>
  );
};

export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
