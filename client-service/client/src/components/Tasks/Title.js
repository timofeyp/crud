import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { TaskContext } from 'containers/CRUD';

const Title = ({ id, value }) => {
  const [fieldValue, setFieldValue] = useState(value);
  const { updateTask } = useContext(TaskContext);
  const handleChange = e => {
    updateTask({ id, title: e.target.value });
    setFieldValue(e.target.value);
  };
  return (
    <Form.Control
      value={fieldValue}
      onChange={handleChange}
      size="sm"
      type="text"
    />
  );
};

Title.propTypes = { id: PropTypes.number, value: PropTypes.string };

export default Title;
