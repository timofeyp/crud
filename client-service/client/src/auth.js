import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Wrapper = ({ wrapped: Component, isAuth, history: { push } }) => {
  if (isAuth) {
    return <Component />;
  }
  push('/login');
  return null;
};

Wrapper.propTypes = {
  wrapped: PropTypes.object,
  isAuth: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = store => ({
  isAuth: store.session.isAuth,
});

export const whenAuthorized = WrapperComponent =>
  connect(
    mapStateToProps,
    null,
  )(props => <Wrapper wrapped={WrapperComponent} {...props} />);
