import { log } from "console";
import React, { createContext, useState, useEffect } from "react"
import { _postAuthLogin, serialKey, addLocalUser, updatePasswordLocal, loginLocal } from '../client/AuthClient'
import { checkInternetConnection } from './utils'

export type AuthData = {
  user: string | null;
  serialKey: string;
  email: string | null;
  finishChecking?: boolean;
  loading?: boolean;
  password: string | null;
};

export interface AuthDataContextType extends AuthData {
  onLogin: (newAuthData: AuthData) => void;
  onLogout: () => void;
  fetchSerialKey: () => void;
  onSubmitLicense: () => void;
}

const initialAuthData: AuthData = {
  user: JSON.parse(localStorage.getItem("user")) || '',
  serialKey: '',
  email: JSON.parse(localStorage.getItem("email")) || '',
  finishChecking: false,
  loading: false,
}

export const AuthDataContext = createContext<AuthDataContextType>({
  ...initialAuthData,
  onLogin: () => { },
  onLogout: () => { },
  fetchSerialKey: () => { },
  onSubmitLicense: () => { },
});

const AuthDataProvider: React.FC = (props) => {
  const [state, setState] = useState<AuthData>(initialAuthData);
  const contextValue = [state, setState];
  return <AuthDataContext.Provider value={contextValue} {...props} />;
}

export const useAuthDataContext = () => {
  const [authData, setAuthData] = React.useContext(AuthDataContext);

  const fetchSerialKey = async () => {
    const sk = await serialKey()
    setAuthData({ ...authData, serialKey: sk, finishChecking: true });
  }

  const onLogout = () => {
    localStorage.clear();
    setAuthData({ ...authData, user: '', email: '' });
  }

  const onLogin = async (newAuthData: AuthData) => {
    setAuthData({ ...authData, loading: true })
    try {
      console.log('====================================');
      console.log('checking internet connection ...');
      console.log('====================================');
      await checkInternetConnection()
      console.log('====================================');
      console.log('Finish checking internet connection');
      console.log('====================================');
      const { data, error } = await _postAuthLogin(newAuthData)
      if (error) {
        setAuthData({ ...authData, loading: false })
        alert(error.error._general_)
      } else {
        await updatePasswordLocal(newAuthData)
        localStorage.setItem("token", JSON.stringify(data.access_token))
        localStorage.setItem("user", JSON.stringify(newAuthData.email))
        localStorage.setItem("role", 'super_admin')
        setAuthData({ ...authData, user: newAuthData.email, loading: false });
      }
    } catch (error) {
      console.log('logging in locally...')
      const isLoggedIn = await loginLocal(newAuthData)
      if (isLoggedIn) {
        localStorage.setItem("token", "notoken")
        localStorage.setItem("user", JSON.stringify(newAuthData.email))
        localStorage.setItem("role", 'super_admin')
        setAuthData({ ...authData, user: newAuthData.email, loading: false });
      } else {
        setAuthData({ ...authData, loading: false })
        alert("Invalid Credential")
      }

    }
  }

  const onSubmitLicense = async (formData: any) => {
    const user = await addLocalUser(formData)
    if (user) setAuthData({ ...authData, serialKey: user.serialKey });
  }

  useEffect(() => {
    fetchSerialKey()
  }, [])

  return {
    ...authData,
    fetchSerialKey,
    onLogout,
    onLogin,
    onSubmitLicense
  };
}

export default AuthDataProvider;
