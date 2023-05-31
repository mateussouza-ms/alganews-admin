import { message, notification } from "antd";
import { CustomError } from "ms-alganews-sdk/dist/CustomError";
import { useEffect } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import { CashFlowExpensesView } from "./views/CashFlowExpenses.view";
import { CashFlowRevenuesView } from "./views/CashFlowRevenues.view";
import { HomeView } from "./views/Home.view";
import { PaymentCreateView } from "./views/PaymentCreate.view";
import { PaymentListView } from "./views/PaymentList.view";
import { UserCreateView } from "./views/UserCreate.view";
import { UserListView } from "./views/UserList.view";

export function Routes() {
  useEffect(() => {
    window.onunhandledrejection = ({ reason }) => {
      if (reason instanceof CustomError) {
        if (reason.data?.objects) {
          reason.data?.objects.forEach((error) => {
            message.error(error.userMessage);
          });
        } else {
          notification.error({
            message: reason.message,
            description:
              reason.data?.detail === reason.message
                ? null
                : reason.data?.detail === "Network reason"
                ? "Erro de conexão"
                : reason.data?.detail,
          });
        }
      } else {
        notification.error({ message: "Houve um erro" });
      }
    };
  }, []);

  return (
    <RouterRoutes>
      <Route path="/" Component={HomeView} />
      <Route path="/usuarios" Component={UserListView} />
      <Route path="/usuarios/cadastro" Component={UserCreateView} />
      <Route path="/pagamentos" Component={PaymentListView} />
      <Route path="/pagamentos/cadastro" Component={PaymentCreateView} />
      <Route path="/fluxo-de-caixa/receitas" Component={CashFlowRevenuesView} />
      <Route path="/fluxo-de-caixa/despesas" Component={CashFlowExpensesView} />
    </RouterRoutes>
  );
}
