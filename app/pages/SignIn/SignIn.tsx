import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Login } from 'kta-ui-components'

import { useAuthDataContext } from 'utils/AuthDataProvider';

// Assuming you have @types/sqlite3 installed
import * as sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();

var db = new sqlite3.Database('kta-pks');

interface Row {
  info: string
}

db.serialize(function () {
  // db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  // Result is an array of rows, you can now have array-autocompletion data
  const result = db.all<Row[]>('SELECT info FROM lorem')

  db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
    console.log(row.id + ": " + row.info);
  });
  console.log(result)
});

db.close();

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