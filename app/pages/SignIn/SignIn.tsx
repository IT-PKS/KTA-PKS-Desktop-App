import React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Login } from 'kta-ui-components'
// import initSQLite from '../../services/sqlite/initSQLite'
// import { User } from "../../entity/User";

import { useAuthDataContext } from 'utils/AuthDataProvider';

const SignIn: React.FC<{} & InjectedFormProps<{}, {}>> = (props) => {
  const { onLogin } = useAuthDataContext();
  // setTimeout(() => {
  //   const insertTest = async () => {
  //     const connection = await initSQLite([User])
  //     console.log("clientTest -> connection", connection)

  //     const theUser = {
  //       "firstName": "Dodi",
  //       "lastName": "Prasetyo",
  //       "age": 22
  //     }
  //     const user = new User(theUser)
  //     // user.firstName = "Timber"
  //     // user.lastName = "Saw"
  //     // user.age = 25

  //     await connection.manager.save(user)
  //     const users = await connection.manager.find(User)
  //     console.log("Loaded usersaa: ", users)
  //     connection.close()
  //   }
  //   insertTest();
  // }, 7000);
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