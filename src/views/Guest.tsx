import React from 'react';
import styled from 'styled-components';
import HeroBanner from '../components/HeroBanner';
import { Button } from 'antd';
// import { signinWithGoogle } from '../firebase';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-content: space-around;
`;
const Banner = styled(HeroBanner)`
  position: absolute;
`;
const BigText = styled.div`
  font-size: 100px;
  color: #fffdfd;
  border-style: solid;
  margin-bottom: 1%;
`;
class Guest extends React.Component {
  handleGetStarted = () => {
    // signinWithGoogle();
  };
  render() {
    return (
      <Container>
        <Banner />
        <Content>
          <BigText>Let Me Help You Revise</BigText>
          <Button size="large" onClick={this.handleGetStarted}>
            Get Started
          </Button>
        </Content>
      </Container>
    );
  }
}
export default Guest;
