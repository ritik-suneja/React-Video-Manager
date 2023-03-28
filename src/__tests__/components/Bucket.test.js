import React from 'react';
import { render } from '@testing-library/react';
import Bucket from '../../components/Bucket';
import store from '../../Store';
import { Provider } from 'react-redux';

  
  test('renders Bucket component without crashing', () => {
    render(
      <Provider store={store}>
        <Bucket />
      </Provider>
    );
  });
  