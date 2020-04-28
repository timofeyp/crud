import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddButton = ({ handleClick }) => (
  <Button onClick={handleClick}>Add Task</Button>
);

AddButton.propTypes = { handleClick: PropTypes.func };

export default AddButton;
