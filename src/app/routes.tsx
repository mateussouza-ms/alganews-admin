import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeView } from "./views/Home.view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
