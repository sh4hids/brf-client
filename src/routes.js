import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  AddUserContainer,
  DonationContainer,
  FeedContainer,
  HomeContainer,
  MadrasaContainer,
  SearchPageContainer,
} from './views/containers';
import { NotFoundPage } from './views/pages';
import { withAuth } from './helpers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
    <Route exact path="/feeds" component={withAuth(FeedContainer)} />
    <Route exact path="/add-user" component={withAuth(AddUserContainer)} />
    <Route exact path="/madrasas" component={withAuth(MadrasaContainer)} />
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
