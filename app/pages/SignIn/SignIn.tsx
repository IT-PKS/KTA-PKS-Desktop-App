import React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Login } from 'kta-ui-components'

import { useAuthDataContext } from 'utils/AuthDataProvider';

const SignIn: React.FC<{} & InjectedFormProps<{}, {}>> = (props) => {
  const { onLogin } = useAuthDataContext();

  return (
    <>
      <form onSubmit={onLogin}>
        <Login />
      </form>
    </>
  );
};


const form = reduxForm<{}, {}>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'sign-in-form',
  touchOnChange: true,
})(SignIn)

export default connect(null)(form) 