import React from 'react';
import { MainLayout } from '../layouts';
import { SearchForm, UsersTable } from '../components/search-page';
import { Container, Text } from '../kits';

const SearchPage = ({ users, userMessage }) => (
  <MainLayout>
    <Container variant="card" p={24} mb={24}>
      <SearchForm />
    </Container>
    <Container variant="card">
      {users.count ? (
        <UsersTable users={users} />
      ) : (
        <Text p={16} textAlign="center">
          {userMessage}
        </Text>
      )}
    </Container>
  </MainLayout>
);

export default SearchPage;
