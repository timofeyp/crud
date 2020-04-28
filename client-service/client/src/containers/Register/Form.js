import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Field from 'components/Form/Field';
import PropTypes from 'prop-types';

const View = ({ handleSubmit, status }) => (
  <Row
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
    }}
  >
    <Col className="mx-auto" xs={4}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Field name="name" type="text" label="Name" />
        </Form.Group>
        <Field name="password" type="password" label="Password" />
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {status && <div color="red">{status}</div>}
      </Form>
    </Col>
  </Row>
);

View.propTypes = {
  handleSubmit: PropTypes.func,
  status: PropTypes.string,
};

export default View;
