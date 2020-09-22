import React from 'react';
import { PersonalData } from 'kta-ui-components'
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import initSQLite from '../../services/sqlite/initSQLite'
import { Member } from "../../entity/Member";


const Home: React.FC<{} & InjectedFormProps<{}, {}>> = (props) => {
  const handleSubmit = (values: any) => {
    console.log("handleSubmit -> values", values)
  }



  const saveToLocal = async () => {
    const sqlite = await initSQLite([Member])
    const payload = {}
    const member = new Member(payload)
    await sqlite.manager.save(member)

    sqlite.close()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate={true}>
        <PersonalData onSubmit={handleSubmit} />
      </form>

    </div>
  );
}

const formHome = reduxForm<{}, {}>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'registration-form',
  touchOnChange: true,
})(Home);


export default connect(null)(formHome)
