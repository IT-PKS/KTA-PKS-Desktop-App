import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { theme, globalStyles } from 'components/base';
import AuthDataProvider from 'utils/AuthDataProvider';
import Router from './Router';
import initializeSQLite from '../../services/sqlite/initializeSQLite'
import "reflect-metadata";
import { User } from "../../entity/User";


const App: React.FC = () => {

  const _getUser = async () => {
    const connection = await initializeSQLite()
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;


    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

  }

  useEffect(() => {
    _getUser()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />
      <AuthDataProvider>
        <Router />
      </AuthDataProvider>
    </ThemeProvider>
  )
};

export default hot(App);
