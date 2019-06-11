import React from 'react';
import styled from 'styled-components';
import banner from '../images/hero-banner.jpg';

const Container = styled.div`
  background-image: url(${banner});
  width: 100%;
  height: 100%;
  background-size: cover;
  filter: blur(0.5px);
  -webkit-filter: blur(0.5px);
  /* Center and scale the image nicely */
  background-repeat: no-repeat;
  background-size: cover;
`;
type PropsType = {
  [props: string]: string;
};
const HeroBanner = (props: PropsType) => <Container {...props} />;
export default HeroBanner;
