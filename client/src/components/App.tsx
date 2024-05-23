import "../styles/App.scss";

import { Route, Routes } from "react-router-dom";
import ThemeProvider from "../context/ThemeProvider";

import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

//Здесь необходим функционал, авторизован ли пользователь, если да то ...
function App() {
  return (
    <div className="wrapper">
      <div className="inner">
        <div className="inner__container">
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
