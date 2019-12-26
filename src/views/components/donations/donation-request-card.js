import React, { Fragment, useState } from 'react';
import { format } from 'date-fns';
import Modal from 'react-modal';

import { RequestDetails } from '.';
import { Devider, StyledText, Text } from '../../kits';

const appEl = document.getElementById('root');
Modal.setAppElement(appEl);
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    height: '520px',
    transform: 'translate(-50%, -50%)',
  },
};

const DonationRequestCard = ({ request, showDevider }) => {
  const [showRequestDetails, setShowRequestDetails] = useState(false);

  const handleCloseModal = () => {
    setShowRequestDetails(false);
  };

  return (
    <Fragment>
      <Text>
        <StyledText fontWeight="bold">{request.receiver.name}</StyledText>{' '}
        requested fro{' '}
        <StyledText color="primary" fontWeight="bold">
          {request.receiver.blood_group}
        </StyledText>{' '}
        blood on{' '}
        <StyledText fontWeight="bold">
          {format(new Date(request.request_date), 'MMMM dd, yyyy', {})}
        </StyledText>
        .{' '}
        <StyledText
          variant="url"
          onClick={() => {
            setShowRequestDetails(true);
          }}
        >
          See details
        </StyledText>
      </Text>
      {showDevider ? <Devider /> : ''}

      <Modal
        isOpen={showRequestDetails}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={() => {
          setShowRequestDetails(false);
        }}
        style={customStyles}
        contentLabel="Add User Modal"
      >
        <RequestDetails
          handleCloseModal={handleCloseModal}
          requestId={request.id}
        />
      </Modal>
    </Fragment>
  );
};

export default DonationRequestCard;
