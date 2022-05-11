import React from 'react';
import ReactDOM from 'react-dom';
import "./resources/styles.css";
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
// import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './redux/reducers';
import {ThemeProvider} from '@material-ui/core';
import {theme} from './globalStyle';

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
const createStoreWithMiddleware = applyMiddleware( ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store = {createStoreWithMiddleware(Reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
    </BrowserRouter>
  </Provider>
    ,
  document.getElementById('root')
);


