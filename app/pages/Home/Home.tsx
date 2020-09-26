import React from 'react';
import { PersonalData } from 'kta-ui-components'
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';



const Home: React.FC<{} & InjectedFormProps<{}, {}>> = (props) => {
  const handleSubmit = (values: any) => {
    console.log("handleSubmit -> values", values)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate={true}>
        {/* <PersonalData onSubmit={handleSubmit} /> */}
        logined
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
