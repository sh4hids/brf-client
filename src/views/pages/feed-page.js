import React from 'react';
import { Link } from 'react-router-dom';

import { MainLayout } from '../layouts';
import { Box, Container, CustomGrid, SectionHeader, Text } from '../kits';

const FeedPage = props => (
  <MainLayout>
    <CustomGrid>
      <Box width={{ xs: 1, sm: 1 / 3 }}>
        <Container mr={{ xs: 0, sm: 24 }} mb={{ xs: 24, sm: 0 }}>
          <Link to="/search">
            <SectionHeader bg="primary">
              <Text variant="body" color="lighter" textAlign="center">
                Total Users
              </Text>
            </SectionHeader>
          </Link>
          <Container variant="card" p={24}>
            <Text textAlign="center" variant="44">
              {props.users.count || 0}
            </Text>
          </Container>
        </Container>
      </Box>

      <Box width={{ xs: 1, sm: 1 / 3 }}>
        <Container mr={{ xs: 0, sm: 24 }} mb={{ xs: 24, sm: 0 }}>
          <Link to="/communities">
            <SectionHeader bg="primary">
              <Text variant="body" color="lighter" textAlign="center">
                Total Communities
              </Text>
            </SectionHeader>
          </Link>
          <Container variant="card" p={24}>
            <Text textAlign="center" variant="44">
              {props.communities.count || 0}
            </Text>
          </Container>
        </Container>
      </Box>

      <Box width={{ xs: 1, sm: 1 / 3 }}>
        <Container mr={{ xs: 0, sm: 24 }} mb={{ xs: 24, sm: 0 }}>
          <Link to="/blood-requests">
            <SectionHeader bg="primary">
              <Text variant="body" color="lighter" textAlign="center">
                Total Requests
              </Text>
            </SectionHeader>
          </Link>
          <Container variant="card" p={24}>
            <Text textAlign="center" variant="44">
              {props.donationRequests.count || 0}
            </Text>
          </Container>
        </Container>
      </Box>
    </CustomGrid>
  </MainLayout>
);

export default FeedPage;
