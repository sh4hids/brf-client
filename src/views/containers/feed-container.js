import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FeedPage } from '../pages';
import { userActions } from '../../state/ducks/users';
import { donationActions } from '../../state/ducks/donations';
import { communityActions } from '../../state/ducks/communities';

class FeedContainer extends Component {
  async componentDidMount() {
    const {
      getAllUsers,
      getAllRequests,
      getAllCommunities,
      token,
    } = this.props;
    await getAllUsers(token, {});
    await getAllRequests(token);
    await getAllCommunities(token);
  }

  render() {
    return <FeedPage {...this.props} />;
  }
}

const mapStateToProps = ({ auth, users, donations, communities }) => {
  return {
    token: auth.token,
    users: users.users,
    communities: communities.communities,
    donationRequests: donations.donationRequests,
  };
};

const mapActionsToProps = {
  getAllUsers: userActions.getAllUsers,
  getAllRequests: donationActions.getAllRequests,
  getAllCommunities: communityActions.getAllCommunities,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FeedContainer);
