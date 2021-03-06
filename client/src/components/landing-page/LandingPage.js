import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import mockup from "../../assets/dodailymockup.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: ${(props) => `calc(100vh - ${props.theme.headerHeight})`};
  background: ${(props) => props.theme.primaryColour};
  color: #fff;
  padding-top: 5rem;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const MockUp = styled.figure`
  width: 50%;

  img {
    display: block;
    width: 90%;
    margin: 0 auto;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
    margin-top: 4rem;
  }
`;

const WelcomeText = styled.div`
  font-family: "Montserrat Alternates", sans-serif;
  width: 30%;
  font-size: 2rem;

  h1 {
    font-size: 2em;
    margin-bottom: 2rem;
  }
  @media screen and (max-width: 1000px) {
    text-align: center;
    width: 90%;
    margin: 0 auto;
  }
`;

const UserLink = styled(Link)`
  background: ${(props) => props.theme.secondaryColour};
  padding: 0.7rem;
  margin-right: 1rem;
  font-size: 1.2rem;
`;

const LandingPage = () => {
  return (
    <Container>
      <WelcomeText>
        <h1>
          Simplify
          <br /> your
          <br /> world.
        </h1>
        <p>
          Organise like a pro across <br /> all your devices.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <UserLink to="/createaccount">Get started</UserLink>
          <UserLink to="/login">Sign In</UserLink>
        </div>
      </WelcomeText>
      <MockUp>
        <img alt="DoDaily device mockup" src={mockup} />
      </MockUp>
    </Container>
  );
};

export default LandingPage;
