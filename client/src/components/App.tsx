import "../styles/App.scss";

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

function App() {
  return (
    <div className="wrapper">
      <div className="inner">
        <div className="inner__container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
