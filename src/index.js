import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore,applyMiddleware  } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'
import history from "./pages/history";
import { connectRouter,routerMiddleware } from 'connected-react-router'
import {ConnectedRouter} from 'connected-react-router/immutable'
import 'font-awesome/css/font-awesome.min.css';
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(connectRouter(history)(rootReducer),applyMiddleware(routerMiddleware(history),thunk));
ReactDOM.render(
  <Suspense fallback={(<div>Loading</div>)}>
  <Provider store ={store}>
  <ConnectedRouter history={history}>
  <App />
  </ConnectedRouter>
  </Provider>
  </Suspense>,
  document.getElementById('root')
);
