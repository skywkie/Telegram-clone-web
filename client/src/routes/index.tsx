import { Route, Routes } from "react-router-dom";

import { ErrorPage, Home, Register, Login } from "../pages";

export function getRoutes(isAuth: boolean) {
	if (isAuth) {
		// TODO: редирект на главную страницу и вывод ошибки при заходе на страницу, которой не существует
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    );
  }
}
