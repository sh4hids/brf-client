import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchPage } from '../pages';
import { userActions } from '../../state/ducks/users';

class SearchPageContainer extends Component {
  async componentDidMount() {
    const { getAllUsers, token } = this.props;
    await getAllUsers(token, {});
  }

  render() {
    const { users } = this.props;

    return (
      <SearchPage
        users={users}
        userMessage={users.count === 0 ? 'No user found' : 'Loading...'}
      />
    );
  }
}

const mapStateToProps = ({ auth, users }) => {
  return {
    token: auth.token,
    ...users,
  };
};

const mapActionsToProps = {
  getAllUsers: userActions.getAllUsers,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchPageContainer);
