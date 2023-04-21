import React from "react";
import ReactDOM from "react-dom/client";

import "antd/dist/reset.css";
import "./main.css";

import { ConfigProvider, ThemeConfig } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./app/layouts/Default/Default.layout";
import { Routes } from "./app/routes";
import { store } from "./core/store";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#09f",
    colorBgBase: "#f3f8fa",

    colorBorder: "rgba(39, 64, 96, 0.15)",
    colorBorderBg: "rgba(60, 88, 124, 0.1)",
    colorText: "#274060",
    colorTextHeading: "#274060",
  },
  components: {
    Layout: {
      colorBgHeader: "#f3f8fa",
      colorBgBody: "#f3f8fa",
      colorBgTrigger: "#274060",
    },
    Menu: {
      colorSubItemBg: "#f3f8fa",
      colorItemBgActive: "#f3f8fa",
    },
    Popover: {
      colorBgBase: "#f3f8fa",
    },
    Table: {
      colorBgBase: "#f3f8fa",
    },
    Input: {
      colorBgBase: "#ffffff",
    },
    Select: {
      colorBgBase: "#ffffff",
    },
    DatePicker: {
      colorBgBase: "#ffffff",
    },
    Calendar: {
      colorBgBase: "#ffffff",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider theme={theme}>
          <DefaultLayout>
            <Routes />
          </DefaultLayout>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
