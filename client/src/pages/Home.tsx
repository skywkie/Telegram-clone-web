import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext,";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = React.useContext(AuthContext);
  console.log(isAuth);

  React.useEffect(() => {
    if (!isAuth) return navigate("/auth/register");
  }, []);

  return <div>Home</div>;
}

export default Home;
