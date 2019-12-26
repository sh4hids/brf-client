import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { HomePage } from '../pages';

class HomeContainer extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return isAuthenticated ? <Redirect to="/feeds" /> : <HomePage />;
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(HomeContainer);
