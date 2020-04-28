import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import View from '../../containers/Login/Form';

const FormTextField = ({
  as,
  md,
  controlId,
  label,
  name,
  type,
  inputGroupPrepend,
}) => (
  <Field name={name}>
    {({ field, form }) => {
      const isValid = !form.errors[field.name];
      const isInvalid = form.touched[field.name] && !isValid;
      return (
        <Form.Group as={as} md={md} controlId={controlId}>
          <Form.Label>{label}</Form.Label>
          <InputGroup>
            {inputGroupPrepend}
            <Form.Control
              {...field}
              type={type}
              isValid={form.touched[field.name] && isValid}
              isInvalid={isInvalid}
              feedback={form.errors[field.name]}
            />

            <Form.Control.Feedback type="invalid">
              {form.errors[field.name]}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      );
    }}
  </Field>
);

FormTextField.propTypes = {
  as: PropTypes.any,
  md: PropTypes.string,
  controlId: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  inputGroupPrepend: PropTypes.object,
};

FormTextField.defaultProps = {
  type: 'text',
  inputGroupPrepend: null,
};

export default FormTextField;
