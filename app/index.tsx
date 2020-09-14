import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/contextual/App';
import configureStore from 'store/configureStore';
import db from 'database/connection'
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../src/entity/User";

// createConnection({
//   "type": "sqlite",
//   "database": "app/database/kta-pks.sql",
//   "synchronize": true,
//   "logging": false,
//   "entities": [User]
// }).then(async connection => {

//   console.log("Inserting a new user into the database...");
//   const user = new User();
//   user.firstName = "Timber";
//   user.lastName = "Saw";
//   user.age = 25;
//   await connection.manager.save(user);
//   console.log("Saved a new user with id: " + user.id);

//   console.log("Loading users from the database...");
//   const users = await connection.manager.find(User);
//   console.log("Loaded users: ", users);

//   console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));


let sql = `SELECT * FROM User`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log(rows)
  // rows.forEach((row) => {
  //   console.log(row.name);
  // });
});


const store = configureStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
