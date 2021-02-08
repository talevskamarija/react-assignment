import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes/routes';
import './style.scss';
import {connect} from "react-redux";

const App = (props) => {

  return (
      <ConnectedRouter history={props.history}>
        <Routes/>
      </ConnectedRouter>
  )
};

export default connect(null)(App);
