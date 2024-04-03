import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { PublicLayout } from "../layouts/Public";
import { Home } from "../containers/Home";

// const Home = lazy(
//   () => import("../containers/Home")
// );
// const About = lazy(
//   () => import("../containers/About")
// );
// const Login = lazy(
//     () => import("../containers/Login")
//   );

export default function publicRoutes() {
  return {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      // { path: "/gioi-thieu", element: <About /> },
      // { path: "/login", element: <Login /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}