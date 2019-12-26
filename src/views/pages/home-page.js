import React from 'react';

import { DefaultLayout } from '../layouts';
import { IntroSection, LoginForm } from '../components/home';
import { CustomGrid, FullpageBg } from '../kits';

import bgImage from '../../assets/images/bg.svg';

const HomePage = () => (
  <FullpageBg imgSrc={bgImage} height={`100vh`}>
    <DefaultLayout>
      <CustomGrid valign="center" halign="justify-center" height={`100vh`}>
        <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
          <IntroSection />
        </CustomGrid.Unit>
        <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
          <LoginForm />
        </CustomGrid.Unit>
      </CustomGrid>
    </DefaultLayout>
  </FullpageBg>
);

export default HomePage;
