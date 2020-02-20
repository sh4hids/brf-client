import React from 'react';
import GlobalStyle from '../styles/global-styles';
import { MainMenu, MobileMenu } from '../components';
import { Container } from '../kits';

const MainLayout = ({ children }) => (
  <Container pl={[0, 280, 280, 280]} pt={[60, 0, 0, 0]}>
    <GlobalStyle />
    <MainMenu />
    <MobileMenu />
    <Container p={24}>{children}</Container>
  </Container>
);

export default MainLayout;
