import { Route, Routes } from "react-router-dom";

import { ErrorPage, Home, Register, Login } from "../pages";

export function getRoutes(isAuth: boolean) {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  } else {
    return (
      //Добавить ErrorElement в login
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  }
}
