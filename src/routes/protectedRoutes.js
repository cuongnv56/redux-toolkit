import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedLayout from "../layouts/Protected";

const Dashboard = lazy(
  () => import("../containers/Dashboard")
);
const Accounts = lazy(
  () => import("../containers/Accounts")
);
const Product = lazy(
    () => import("../containers/Product")
  );

export default function protectedRoutes() {
  return {
    element: <ProtectedLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/accounts", element: <Accounts /> },
      { path: "/products", element: <Product /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}