import React from 'react';

import { MainLayout } from '../layouts';
import { Container, CustomGrid, SectionHeader, Text } from '../kits';

const FeedPage = props => (
  <MainLayout>
    <CustomGrid>
      <CustomGrid.Unit size={{ xs: 1 / 2, sm: 1 / 3 }}>
        <Container mr={24}>
          <SectionHeader bg="primary">
            <Text variant="body" color="lighter" textAlign="center">
              Total Users
            </Text>
          </SectionHeader>
          <Container variant="card" p={24}>
            <Text textAlign="center" variant="44">
              {props.users.count || 0}
            </Text>
          </Container>
        </Container>
      </CustomGrid.Unit>

      <CustomGrid.Unit size={{ xs: 1 / 2, sm: 1 / 3 }}>
        <Container mr={24}>
          <SectionHeader bg="primary">
            <Text variant="body" color="lighter" textAlign="center">
              Total Madrasas
            </Text>
          </SectionHeader>
          <Container variant="card" p={24}>
            <Text textAlign="center" variant="44">
              {props.madrasas.count || 0}
            </Text>
          </Container>
        </Container>
      </CustomGrid.Unit>

      <CustomGrid.Unit size={{ xs: 1 / 2, sm: 1 / 3 }}>
        <Container mr={24}>
          <SectionHeader bg="primary">
            <Text variant="body" color="lighter" textAlign="center">
              Total Requests
            </Text>
          </SectionHeader>
          <Container variant="card" p={24}>
            <Text textAlign="center" variant="44">
              {props.donationRequests.count || 0}
            </Text>
          </Container>
        </Container>
      </CustomGrid.Unit>
    </CustomGrid>
  </MainLayout>
);

export default FeedPage;
