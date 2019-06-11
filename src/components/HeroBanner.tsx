import React from 'react';
import styled from 'styled-components';
import banner from '../images/hero-banner.jpg';

const Container = styled.div`
  background-image: url(${banner});
  width: 100%;
  height: 650px;
  background-size: cover;
  filter: blur(2px);
  -webkit-filter: blur(2px);
  margin-top: 1%;
  /* Center and scale the image nicely */
  background-repeat: no-repeat;
  background-size: cover;
`;
const HeroBanner = () => <Container />;
export default HeroBanner;
