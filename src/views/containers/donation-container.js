import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DonationPage } from '../pages';
import { donationActions } from '../../state/ducks/donations';

class DonationContainer extends Component {
  componentDidMount() {
    const { token, getAllRequests } = this.props;
    getAllRequests(token);
  }

  render() {
    return <DonationPage {...this.props} />;
  }
}

const mapStateToProps = ({ auth, donations }) => {
  return {
    token: auth.token,
    donationRequests: donations.donationRequests,
  };
};

const mapActionsToProps = {
  getAllRequests: donationActions.getAllRequests,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DonationContainer);
