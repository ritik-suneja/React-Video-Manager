import React from 'react';
import { render } from '@testing-library/react';
import History from '../../components/History';
import store from '../../Store';
import { Provider } from 'react-redux';

beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });
  
test('renders History component without crashing', () => {
  render(
    <Provider store={store}>
      <History />
    </Provider>
  );
});

