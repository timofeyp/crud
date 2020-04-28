import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Logout = ({ logout, userId }) => (
  <Button size="sm" onClick={logout}>
    UserId: #{userId} - LOGOUT HERE
  </Button>
);

Logout.propTypes = {
  logout: PropTypes.func,
  userId: PropTypes.number,
};

export default Logout;
