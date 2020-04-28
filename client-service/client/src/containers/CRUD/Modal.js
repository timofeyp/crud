import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Field from '../../components/Form/Field';

const View = ({ addTask, show, setShow }) => {
  const handleClose = () => setShow(false);
  const handleSubmit = values => {
    addTask(values);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Please, add a task</Modal.Title>
      </Modal.Header>
      <Formik initialValues={{ title: '' }} onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <Form className="m-3" onSubmit={handleSubmit}>
            <Form.Group>
              <Field name="title" type="text" label="Title" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

View.propTypes = {
  addTask: PropTypes.func,
  show: PropTypes.bool,
  setShow: PropTypes.func,
};

export default View;
