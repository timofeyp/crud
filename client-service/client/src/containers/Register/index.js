import React from 'react';
import { Formik } from 'formik';
import Form from 'containers/Login/Form';
import { fetchRegisterRoutine } from 'store/ducks/session.duck';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const View = ({ register }) => (
  <Formik
    initialValues={{ name: '', password: '' }}
    onSubmit={(values, formikActions) => register({ values, formikActions })}
  >
    {formikProps => <Form {...formikProps} />}
  </Formik>
);

View.propTypes = {
  register: PropTypes.func,
};

const mapDispatchToProps = {
  register: fetchRegisterRoutine.trigger,
};

export default connect(null, mapDispatchToProps)(View);
