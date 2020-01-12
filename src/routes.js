import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  AddUserContainer,
  DonationContainer,
  FeedContainer,
  HomeContainer,
  CommunityContainer,
  SearchPageContainer,
} from './views/containers';
import { NotFoundPage } from './views/pages';
import { withAuth } from './helpers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
    <Route exact path="/feeds" component={withAuth(FeedContainer)} />
    <Route exact path="/add-user" component={withAuth(AddUserContainer)} />
    <Route exact path="/communities" component={withAuth(CommunityContainer)} />
    <Route exact path="/search" component={withAuth(SearchPageContainer)} />
    <Route
      exact
      path="/blood-requests"
      component={withAuth(DonationContainer)}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
