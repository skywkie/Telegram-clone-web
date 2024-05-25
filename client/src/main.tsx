import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./styles/main.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import ThemeProvider from "./context/ThemeContext.tsx";
import AuthProvider from "./context/AuthContext,.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
