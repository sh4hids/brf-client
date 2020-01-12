import React from 'react';

import { MainLayout } from '../layouts';
import { AddCommunityForm } from '../components/communities';
import { Container, SectionHeader, Text } from '../kits';

const CommpunityPage = () => (
  <MainLayout>
    <SectionHeader bg="primary">
      <Text variant="h4" color="lighter" textAlign="center">
        Add Community
      </Text>
    </SectionHeader>
    <Container variant="card" p={24} pb={64}>
      <AddCommunityForm />
    </Container>
  </MainLayout>
);

export default CommpunityPage;
