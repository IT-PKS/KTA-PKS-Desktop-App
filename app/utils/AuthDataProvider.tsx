import React from 'react';
import { _postAuthLogin } from '../client/AuthClient'
import { serialKey } from '../client/AuthClient'


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
}

const initialAuthData: AuthData = {
  user: JSON.parse(localStorage.getItem("user")) || '',
  serialKey: '',
  email: JSON.parse(localStorage.getItem("email")) || '',
  finishChecking: false,
  loading: false,
};


export const AuthDataContext = React.createContext<AuthDataContextType>({
  ...initialAuthData,
  onLogin: () => { },
  onLogout: () => { },
});

// Hooks
export const useAuthDataContext = () => React.useContext(AuthDataContext);

// Dummy auth manager
const getAuthData = () =>
  new Promise<AuthData>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        ...initialAuthData,
      });
    }, 1000);
  });

const AuthDataProvider: React.FC = props => {
  const [authData, setAuthData] = React.useState<AuthData>(initialAuthData);

  /* The first time the component is rendered, it tries to
   * fetch the auth data from a source, like a cookie or
   * the localStorage.
   */
  React.useEffect(() => {
    const fetchSerialKey = async () => {
      const sk = await serialKey()
      setAuthData({ ...authData, serialKey: sk });
    }
    const fetchData = async () => {
      const currentAuthData = await getAuthData();
      setAuthData({ ...currentAuthData, finishChecking: true });
    };
    fetchSerialKey()
    fetchData();
  }, []);

  const onLogout = () => {
    localStorage.clear();
    setAuthData({ ...authData, user: '', email: '' });
  }

  const onLogin = async (newAuthData: AuthData) => {
    setAuthData({ ...authData, loading: true })
    const { data, error } = await _postAuthLogin(newAuthData)
    console.log("onLogin -> error", error)
    if (error) {
      setAuthData({ ...authData, loading: false })
      alert(`${error.message}: ${error.error}`)
    }
    if (data) {
      localStorage.setItem("user", JSON.stringify(newAuthData.email))
      setAuthData({ ...authData, user: newAuthData.email, loading: false });
    }
  }


  const authDataValue = React.useMemo(() => {
    return {
      ...authData,
      onLogin,
      onLogout,
    };
  }, [authData]);

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};



export default AuthDataProvider;
