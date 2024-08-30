import { BrowserRouter } from "react-router-dom";
import "./locale/i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store";
import { Provider } from "react-redux";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
