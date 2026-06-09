import { RouterProvider } from "react-router-dom";
import { routes } from "./app-routes";

export const RoutesProvider = () => {
  return (
    <RouterProvider router={routes}></RouterProvider>
  );
};
