import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Input } from 'kta-ui-components'

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
    <div>
      <h2>SignIn</h2>
      <form onSubmit={onLogin}>
        <Field
          name="username"
          placeholder="Username"
          component={Input}
          type="text"
        />
        <Field
          name="password"
          placeholder="Password"
          component={Input}
          type="password"
        />
        <Input placeholder="test redux form" />
        <button type="submit">Login</button>
      </form>

      <Link to="/broken">Broken Link</Link>
    </div>
  );
};


const form = reduxForm<{}, {}>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'sign-form',
  touchOnChange: true,
})(SignIn)

export default connect(null)(form) 