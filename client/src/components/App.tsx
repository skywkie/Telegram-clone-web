import "@/assets/styles/App.scss";

import RenderRoutes from "@/routes";

const App = (): React.ReactNode => {
  return (
    <div className="wrapper">
      <div className="inner">
        <div className="inner__container">
          <RenderRoutes />
        </div>
      </div>
    </div>
  );
};

export default App;
