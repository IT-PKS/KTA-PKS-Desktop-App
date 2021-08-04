import React, { createContext, useState, useEffect } from "react"
import { _postAuthLogin, serialKey, addLocalUser, updatePasswordLocal, loginLocal, _postSerialKey } from '../client/AuthClient'
import { checkInternetConnection } from './Utils'
import { useHistory } from "react-router-dom";
import os from 'os'
import getMac from 'getmac'
import { copyInitialDB } from '../utils/Utils'


export type AuthData = {
  user: string | null;
  serialKey: string;
  email: string | null;
  finishChecking?: boolean;
  loading?: boolean;
};

export interface AuthDataContextType extends AuthData {
  onLogin: (newAuthData: AuthData) => void;
  onLogout: () => void;
  fetchSerialKey: () => void;
  onSubmitLicense: () => void;
}

const initialAuthData: AuthData = {
  user: JSON.parse(`${localStorage.getItem("user")}`) || '',
  serialKey: '',
  email: JSON.parse(`${localStorage.getItem("email")}`) || '',
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
  const history = useHistory();
  const [authData, setAuthData] = React.useContext<any>(AuthDataContext);

  const fetchSerialKey = async () => {
    await copyInitialDB()
    const sk = await serialKey()
    setAuthData({ ...authData, serialKey: sk, finishChecking: true });
  }

  const onLogout = () => {
    localStorage.clear();
    setAuthData({ ...authData, user: '', email: '' });
  }

  const onLoginOnline = async (newAuthData: any) => {
    const { data, error } = await _postAuthLogin(newAuthData)
    if (error) {
      setAuthData({ ...authData, loading: false })
      alert(error.error._general_)
    } else {
      await updatePasswordLocal(newAuthData)
      localStorage.setItem("token", JSON.stringify(data.access_token))
      localStorage.setItem("user", JSON.stringify(newAuthData.email))
      localStorage.setItem("role", 'super_admin')
      history.push('/ringkasan')
      window.location.reload()
      setAuthData({ ...authData, user: newAuthData.email, loading: false });
    }
  }

  const onLoginOffline = async (newAuthData: any) => {
    const isLoggedIn = await loginLocal(newAuthData)
    if (isLoggedIn) {
      localStorage.setItem("token", "notoken")
      localStorage.setItem("user", JSON.stringify(newAuthData.email))
      localStorage.setItem("role", 'super_admin')
      history.push('/')
      // window.location.reload()
      setAuthData({ ...authData, user: newAuthData.email, loading: false })
    } else {
      setAuthData({ ...authData, loading: false })
      alert("Invalid Credential")
    }
  }

  const onLogin = async (newAuthData: AuthData) => {
    setAuthData({ ...authData, loading: true })
    try {
      console.log('Check Connection...')
      await checkInternetConnection(3000)
      await onLoginOnline(newAuthData)
    } catch (error) {
      console.log('logging in locally...')
      await onLoginOffline(newAuthData)
    }
  }

  const onSubmitLicense = async (formData: any) => {
    const deviceName = os.userInfo().username
    const deviceMac = getMac()
    const deviceOS = os.platform()
    formData.device_os = deviceOS
    formData.device_name = deviceName
    formData.device_mac = deviceMac
    const { data, error } = await _postSerialKey(formData)
    formData.hashKey = data.data.hash
    if (error) {
      alert('Invalid SerialKey')
    } else {
      const user = await addLocalUser(formData)
      if (user) setAuthData({ ...authData, serialKey: user.serialKey });
      alert('Success !')
    }
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
