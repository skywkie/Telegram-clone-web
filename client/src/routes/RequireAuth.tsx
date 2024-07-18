import React from "react";

import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/hooks";

interface RequireAuthProps {
  children: React.ReactNode;
  redirectTo: string;
  reversed?: boolean;
}

const RequireAuth = ({ children, redirectTo, reversed }: RequireAuthProps) => {
  const { isAuth } = useAppSelector((state) => state.authSlice);
  console.log(isAuth);

  if (reversed) {
    if (isAuth) return <Navigate to={redirectTo} replace />;

    return children;
  }

  if (isAuth) return children;

  return <Navigate to={redirectTo} replace />;
};

export default RequireAuth;
