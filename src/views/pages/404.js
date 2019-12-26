import React from 'react';

import { DefaultLayout } from '../layouts';
import { CustomGrid, GoTo, Text } from '../kits';

const NotFoundPage = () => (
  <DefaultLayout>
    <CustomGrid valign="center" halign="justify-center" height={`100vh`}>
      <CustomGrid.Unit size={{ xs: 1, sm: 1 }}>
        <Text variant="h4" textAlign="center">
          (404) Not found
        </Text>
        <Text textAlign="center" mt={16}>
          Back to <GoTo link="/">Home</GoTo>
        </Text>
      </CustomGrid.Unit>
    </CustomGrid>
  </DefaultLayout>
);

export default NotFoundPage;
