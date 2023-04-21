import React from "react";
import ReactDOM from "react-dom/client";

import "antd/dist/reset.css";
import "./main.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./app/layouts/Default/Default.layout";
import { Routes } from "./app/routes";
import { store } from "./core/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DefaultLayout>
          <Routes />
        </DefaultLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
