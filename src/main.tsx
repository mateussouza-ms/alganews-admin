import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "antd/dist/reset.css";
import "./main.css";

import { Provider } from "react-redux";
import { store } from "./core/store";
import { DefaultLayout } from "./app/layouts/Default/Default.layout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <DefaultLayout>
        <App />
      </DefaultLayout>
    </Provider>
  </React.StrictMode>
);
