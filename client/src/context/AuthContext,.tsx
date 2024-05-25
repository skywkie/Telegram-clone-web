import React from "react";

export const AuthContext = React.createContext<any>(null);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
