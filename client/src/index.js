import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <CookiesProvider>
          <Router>
            <Route path="/" component={App} />
          </Router>
        </CookiesProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
