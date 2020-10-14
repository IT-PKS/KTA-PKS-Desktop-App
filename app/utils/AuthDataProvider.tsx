import React, { createContext, useState } from "react"
import { _postAuthLogin, serialKey } from '../client/AuthClient'

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
  fetchSerialKey: () => { }
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
    setAuthData({ ...authData, serialKey: sk });
  }

  const onLogout = () => {
    localStorage.clear();
    setAuthData({ ...authData, user: '', email: '' });
  }

  const onLogin = async (newAuthData: AuthData) => {
    setAuthData({ ...authData, loading: true })
    const { data, error } = await _postAuthLogin(newAuthData)
    if (error) {
      setAuthData({ ...authData, loading: false })
      alert(error.error._general_)
    } else {
      localStorage.setItem("token", JSON.stringify(data.token))
      localStorage.setItem("user", JSON.stringify(newAuthData.email))
      setAuthData({ ...authData, user: newAuthData.email, loading: false });
    }
  }

  React.useEffect(() => {
    fetchSerialKey()
  }, [])

  return {
    ...authData,
    fetchSerialKey,
    onLogout,
    onLogin,
  };
}

export default AuthDataProvider;
