import { Routes as AppRoutes, Route as PublicRoute } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Welcome } from "../pages/Welcome/Welcome";

export const Routes = () => {
  return (
    <AppRoutes>
      <PublicRoute path="/" element={<Home />}></PublicRoute>
      <PublicRoute path="/welcome" element={<Welcome />}></PublicRoute>
    </AppRoutes>
  );
};
