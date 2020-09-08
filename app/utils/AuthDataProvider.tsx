import React from 'react';

export type AuthData = {
  user: string | null;
  finishChecking?: boolean;
};

export interface AuthDataContextType extends AuthData {
  onLogin: (newAuthData: AuthData) => void;
  onLogout: () => void;
}

const initialAuthData: AuthData = {
  user: JSON.parse(localStorage.getItem("user")) || '',
  finishChecking: false,
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
        ...initialAuthData
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
    const fetchData = async () => {
      const currentAuthData = await getAuthData();
      setAuthData({ ...currentAuthData, finishChecking: true });
    };

    fetchData();
  }, []);

  const onLogout = () => {
    localStorage.clear();
    setAuthData({ ...authData, user: '' });
  }

  const onLogin = (newAuthData: AuthData) => {
    localStorage.setItem("user", JSON.stringify('Dodi'))
    setAuthData({ ...authData, user: 'Dodi' });
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
