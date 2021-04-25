import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { MainView } from './components/repositories/mainView';

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <MainView />
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
