import { Route, Routes } from "react-router-dom";

import RequireAuth from "./RequireAuth";

import { Home, Register, Login } from "@/pages";
import {
  ROUTE_PATH_HOME,
  ROUTE_PATH_LOGIN,
  ROUTE_PATH_REGISTER,
} from "@/api/constants/routes";

const ROUTES = [
  {
    path: ROUTE_PATH_HOME,
    element: (
      <RequireAuth redirectTo={ROUTE_PATH_LOGIN}>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: ROUTE_PATH_REGISTER,
    element: (
      <RequireAuth redirectTo={ROUTE_PATH_HOME} reversed>
        <Register />
      </RequireAuth>
    ),
  },
  {
    path: ROUTE_PATH_LOGIN,
    element: (
      <RequireAuth redirectTo={ROUTE_PATH_HOME} reversed>
        <Login />
      </RequireAuth>
    ),
  },
];

const RenderRoutes = () => {
  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route {...route} key={route.path} />
      ))}
    </Routes>
  );
};

export default RenderRoutes;
