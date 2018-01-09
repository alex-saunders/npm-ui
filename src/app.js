import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router'

import 'material-components-web/dist/material-components-web.css';

import './base.scss';

import AppShell from './containers/app-shell/app-shell';

import configureStore from './store/configure-store';

const rootEl = document.getElementById('root');

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MemoryRouter
      initialEntries={['/scripts']}  
    >
      <AppShell />
    </MemoryRouter>
  </Provider>,
  rootEl
)
