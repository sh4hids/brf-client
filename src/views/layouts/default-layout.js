import React from 'react';
import GlobalStyle from '../styles/global-styles';
import { Container } from '../kits';

const DefaultLayout = ({ children }) => (
  <Container variant="main">
    <GlobalStyle />
    {children}
  </Container>
);

export default DefaultLayout;
