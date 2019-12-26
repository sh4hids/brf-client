import React from 'react';

import { MainLayout } from '../layouts';
import { AddUserForm } from '../components/add-user';
import { Container, SectionHeader, Text } from '../kits';

const AddUserPage = () => (
  <MainLayout>
    <SectionHeader bg="primary">
      <Text variant="h4" color="lighter" textAlign="center">
        Add User
      </Text>
    </SectionHeader>
    <Container variant="card" p={24} pb={64}>
      <AddUserForm />
    </Container>
  </MainLayout>
);

export default AddUserPage;
