import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./styles/main.scss";
import store from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ThemeProvider from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
