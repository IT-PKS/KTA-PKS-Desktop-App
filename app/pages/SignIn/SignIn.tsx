import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Input, Login } from 'kta-ui-components'

import { useAuthDataContext } from 'utils/AuthDataProvider';

import NeDB from 'nedb'

const options = {
  inMemoryOnly: false,
  filename: 'kta-pks'
}

const user = new NeDB(options)

console.log(user)


const SignIn: React.FC<Props & InjectedFormProps<{}, {}>> = (props) => {
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
  form: 'sign-form',
  touchOnChange: true,
})(SignIn)

export default connect(null)(form) 