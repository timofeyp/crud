import React from 'react';
import { Formik } from 'formik';
import Form from 'containers/Login/Form';
import { fetchAuthRoutine } from 'store/ducks/session.duck';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const View = ({ login }) => (
  <Formik
    initialValues={{ name: '', password: '' }}
    onSubmit={(values, formikActions) => login({ values, formikActions })}
  >
    {formikProps => <Form {...formikProps} />}
  </Formik>
);

View.propTypes = {
  login: PropTypes.func,
};

const mapDispatchToProps = {
  login: fetchAuthRoutine.trigger,
};

export default connect(null, mapDispatchToProps)(View);
