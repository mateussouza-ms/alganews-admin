import { Middleware, configureStore, isRejected } from "@reduxjs/toolkit";
import { notification } from "antd";
import { userReducer } from "./User.reducer";

const observeActions: Middleware = () => (next) => (action) => {
  if (isRejected(action)) {
    notification.error({
      message: action.error.message,
    });
  }

  next(action);
};

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(observeActions);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
