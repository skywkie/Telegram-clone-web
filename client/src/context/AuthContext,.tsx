import React from "react";

export interface AuthContextValues {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<AuthContextValues | null>(null);

interface AuthProviderChildren {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
