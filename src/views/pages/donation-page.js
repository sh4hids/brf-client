import React, { useState, Fragment } from 'react';

import { MainLayout } from '../layouts';
import {
  CreateDonationForm,
  DonationRequestCard,
} from '../components/donations';
import { Button, Container, SectionHeader, Text } from '../kits';

const DonationPage = ({ donationRequests }) => {
  const [showRequestForm, setShowRequestForm] = useState(false);

  return (
    <MainLayout>
      {showRequestForm && (
        <Fragment>
          <Button
            onClick={() => {
              setShowRequestForm(false);
            }}
            mb={24}
            variant="primary"
          >
            Hide form
          </Button>
          <Container variant="card" p={24} mb={24}>
            <CreateDonationForm />
          </Container>
        </Fragment>
      )}
      {!showRequestForm && (
        <Button
          variant="primary"
          onClick={() => {
            setShowRequestForm(true);
          }}
        >
          Create new request
        </Button>
      )}
      <SectionHeader bg="primary" mt={24}>
        <Text variant="h6" color="lighter">
          Latest requests
        </Text>
      </SectionHeader>
      <Container variant="card" p={24}>
        {donationRequests.count > 0
          ? donationRequests.results.map((request, i) => (
              <DonationRequestCard
                request={request}
                showDevider={i !== donationRequests.results.length - 1}
                key={request.id}
              />
            ))
          : ''}
      </Container>
    </MainLayout>
  );
};

export default DonationPage;
