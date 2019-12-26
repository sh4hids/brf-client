import React from 'react';

import { MainLayout } from '../layouts';
import { AddMadrasaForm } from '../components/madrasas';
import { Container, SectionHeader, Text } from '../kits';

const MadrasaPage = () => (
  <MainLayout>
    <SectionHeader bg="primary">
      <Text variant="h4" color="lighter" textAlign="center">
        Add Madrasa
      </Text>
    </SectionHeader>
    <Container variant="card" p={24} pb={64}>
      <AddMadrasaForm />
    </Container>
  </MainLayout>
);

export default MadrasaPage;
