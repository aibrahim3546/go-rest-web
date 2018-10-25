import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import rootStore from './stores';
import App from './App';

import ScrollToTop from './ScrollToTop';

import Home from './views/home/Home';
import Post from './views/post/Post';

export default () => (
  <Provider rootStore={rootStore}>
    <App>
      <HashRouter>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post/:id" component={Post} />
          </Switch>
        </ScrollToTop>
      </HashRouter>
    </App>
  </Provider>
);
