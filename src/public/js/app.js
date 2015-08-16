import { Provider } from 'react-redux';
import React from 'react';
import Router, { HistoryLocation } from 'react-router';

import createStore from './store';
import routes from './routes'


// Client render
if (typeof document !== 'undefined') {
  const store = createStore(window.__redux_data__);
  Router.run(routes, HistoryLocation, (Handler, routerState) => {
    React.render(
      <Provider store={store}>
        {() => <Handler routerState={routerState} />}
      </Provider>,
      document.getElementById('app')
    );
  });
}

// Isomorphic handling here.
export default function() {};
