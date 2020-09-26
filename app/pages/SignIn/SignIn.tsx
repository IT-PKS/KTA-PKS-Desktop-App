import React, {useEffect} from 'react';
import { Login } from 'kta-ui-components'
import { clientPost } from '../../services/URLApi/URLApi'
import { useForm } from 'react-hook-form'
import { useAuthDataContext } from 'utils/AuthDataProvider';

type Inputs = {
  email: string,
  password: string,
};

const SignIn: React.FC = () => {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  const { onLogin } = useAuthDataContext();

  const onSubmit = async(data:object) => {
    console.log("onSubmit -> data", data)
    const payload = {
      email : "mamen@admin.com",
      password: "password"
    }
    const datas = await clientPost('auth/login', payload)
    console.log("tryToLogin -> data", datas)
  }
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ alignItems: 'center', height: '100vh' }}>
        <Login />
      </form>
    </>
  );
};


export default SignIn