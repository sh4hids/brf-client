import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { authActions } from '../../../state/ducks/auth';

import { Button, Container, InputContainer, Text } from '../../kits';

class LoginFormComponent extends Component {
  render() {
    const { touched, errors } = this.props;

    return (
      <Form>
        <Container variant="card" p={24} maxWidth={320}>
          <InputContainer
            border="none"
            borderBottom="1px solid #FF7275"
            borderRadius={0}
            mb={16}
            textAlign="center"
          >
            <Field
              type="text"
              name="username"
              placeholder="username or email"
            />
          </InputContainer>
          {touched.username && errors.username && (
            <Text variant="caption" color="error" mt={8} mb={8}>
              {errors.username}
            </Text>
          )}

          <InputContainer
            border="none"
            borderBottom="1px solid #FF7275"
            borderRadius={0}
            mb={16}
            textAlign="center"
          >
            <Field type="password" name="password" placeholder="password" />
          </InputContainer>
          {touched.password && errors.password && (
            <Text variant="caption" color="error" mt={8} mb={8}>
              {errors.password}
            </Text>
          )}

          <Button type="submit" variant="primary" mt={16}>
            Login
          </Button>
        </Container>
      </Form>
    );
  }
}

const LoginForm = withFormik({
  mapPropsToValues() {
    return {
      username: '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  }),
  async handleSubmit(values, { props, setErrors, setSubmitting, resetForm }) {
    try {
      const { login } = props;
      const { username, password } = values;
      await login({ username, password });

      setSubmitting();
    } catch (err) {
      setErrors({ password: 'Username or password not correct' });
    }
    setSubmitting();
  },
})(LoginFormComponent);

const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: auth.isAuthenticated,
  };
};

const mapActionsToProps = {
  login: authActions.login,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LoginForm);
