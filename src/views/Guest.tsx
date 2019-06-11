import React from 'react';
import styled from 'styled-components';
import HeroBanner from '../components/HeroBanner';

const Container = styled.div``;

class Guest extends React.Component {
  render() {
    return (
      <Container>
        <HeroBanner />
      </Container>
    );
  }
}
export default Guest;
