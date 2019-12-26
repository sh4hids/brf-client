import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FeedPage } from '../pages';
import { userActions } from '../../state/ducks/users';
import { donationActions } from '../../state/ducks/donations';
import { madrasaActions } from '../../state/ducks/madrasas';

class FeedContainer extends Component {
  async componentDidMount() {
    const { getAllUsers, getAllRequests, getAllMadrasas, token } = this.props;
    await getAllUsers(token, {});
    await getAllRequests(token);
    await getAllMadrasas(token);
  }

  render() {
    return <FeedPage {...this.props} />;
  }
}

const mapStateToProps = ({ auth, users, donations, madrasas }) => {
  return {
    token: auth.token,
    users: users.users,
    madrasas: madrasas.madrasas,
    donationRequests: donations.donationRequests,
  };
};

const mapActionsToProps = {
  getAllUsers: userActions.getAllUsers,
  getAllRequests: donationActions.getAllRequests,
  getAllMadrasas: madrasaActions.getAllMadrasas,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FeedContainer);
