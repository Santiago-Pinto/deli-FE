import { Routes as AppRoutes, Route as PublicRoute } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Test } from "../pages/Test/Test";

export const Routes = () => {
  return (
    <AppRoutes>
      <PublicRoute path="/" element={<Home />}></PublicRoute>
      <PublicRoute path="/test" element={<Test />}></PublicRoute>
    </AppRoutes>
  );
};
