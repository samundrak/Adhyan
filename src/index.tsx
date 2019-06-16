import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import Adhyan from './core/Adhyan';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { firestore } from './firebase';
import AppProvider from './providers/AppProvider';

const store = configureStore({});

const adhyan: Adhyan = new Adhyan(store, firestore);
adhyan.listenToFireStoreEvents();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App app={adhyan} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
if (module.hot) {
  module.hot.accept();
}
