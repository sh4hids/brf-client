import React from 'react';

import { DefaultLayout } from '../layouts';
import { IntroSection, LoginForm } from '../components/home';
import { CustomGrid, FullpageBg, Box } from '../kits';

import bgImage from '../../assets/images/bg.svg';

const HomePage = () => (
  <FullpageBg imgSrc={bgImage} height={`100vh`}>
    <DefaultLayout>
      <CustomGrid
        valign="center"
        halign="justify-center"
        height={`100vh`}
        p={[3, 3, 0, 0]}
      >
        <Box width={[1, 1, 1 / 3, 1 / 3]}>
          <IntroSection />
        </Box>
        <Box width={[1, 1, 1 / 3, 1 / 3]}>
          <LoginForm />
        </Box>
      </CustomGrid>
    </DefaultLayout>
  </FullpageBg>
);

export default HomePage;
