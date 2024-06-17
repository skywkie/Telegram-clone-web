import { getRoutes } from "../routes";

import "../styles/App.scss";
import { useAppSelector } from "../hooks";

function App() {
  const { isAuth } = useAppSelector((state) => state.authSlice);

  return (
    <div className="wrapper">
      <div className="inner">
        <div className="inner__container">{getRoutes(isAuth)}</div>
      </div>
    </div>
  );
}

export default App;
