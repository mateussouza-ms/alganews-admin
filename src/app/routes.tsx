import { Route, Routes as RouterRoutes } from "react-router-dom";
import { CashFlowExpensesView } from "./views/CashFlowExpenses.view";
import { CashFlowRevenuesView } from "./views/CashFlowRevenues.view";
import { HomeView } from "./views/Home.view";
import { PaymentCreateView } from "./views/PaymentCreate.view";
import { PaymentListView } from "./views/PaymentList.view";
import { UserCreateView } from "./views/UserCreate.view";
import { UserListView } from "./views/UserList.view";

export function Routes() {
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
