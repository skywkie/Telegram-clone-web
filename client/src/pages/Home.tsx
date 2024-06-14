import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.authSlice);

  React.useEffect(() => {
    if (!isAuth) return navigate("/auth/register");
  }, []);

  return <div>Home</div>;
}

export default Home;
