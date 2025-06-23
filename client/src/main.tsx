import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "@/assets/styles/main.scss";

import store from "@/redux/store.ts";
import ThemeProvider from "@/utils/context/ThemeContext";

import App from "@/components/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);
