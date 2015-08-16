import { Provider } from 'react-redux';
import React from 'react';
import Router, { DefaultRoute, HistoryLocation, Route } from 'react-router';

import Index from './handlers/Index';


export default (
  <Route path="/">
    <DefaultRoute name="index" handler={Index}/>
  </Route>
);