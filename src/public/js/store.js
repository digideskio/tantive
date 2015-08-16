import { createStore } from 'redux';

import reducer from './reducers/index';

export default (data) => {
  return createStore(reducer, data);
}
