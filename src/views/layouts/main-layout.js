import React from 'react';
import GlobalStyle from '../styles/global-styles';
import { MainMenu } from '../components';
import { Container } from '../kits';

const MainLayout = ({ children }) => (
  <Container pl={280}>
    <GlobalStyle />
    <MainMenu />
    <Container p={24}>{children}</Container>
  </Container>
);

export default MainLayout;
