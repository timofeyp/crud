import React, { useEffect } from 'react';
import CRUD from 'containers/CRUD';
import Login from 'containers/Login';
import Register from 'containers/Register';
import { whenAuthorized } from 'auth';
import { connect } from 'react-redux';
import {
  setTokensRoutine,
  fetchSessionRoutine,
} from 'store/ducks/session.duck';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const App = ({ setTokens, token, refreshToken, isAuth, isSessionLoading }) => {
  useEffect(() => {
    if (token && refreshToken && !isAuth) setTokens({ token, refreshToken });
  }, [token, refreshToken]);
  if (token && refreshToken && isSessionLoading) {
    return null;
  }
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={whenAuthorized(CRUD)} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  setTokens: PropTypes.func,
  isSessionLoading: PropTypes.bool,
  token: PropTypes.string,
  refreshToken: PropTypes.string,
  isAuth: PropTypes.bool,
};

const mapStateToProps = ({ session }) => ({
  token: session.token,
  refreshToken: session.refreshToken,
  isAuth: session.isAuth,
  isSessionLoading: session.isSessionLoading,
});

const mapDispatchToProps = {
  setTokens: setTokensRoutine.trigger,
  fetchSession: fetchSessionRoutine.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
