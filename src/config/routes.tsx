import { useRoutes } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Setting from "../pages/Setting";
import ArticleByCategory from "../admin/articles/ArticleByCategory";
import ArticleById from "../admin/articles/ArticleById";

function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/admin", element: <Admin /> },
    { path: "/setting", element: <Setting /> },
    { path: "/article/:id", element: <ArticleById /> },
    { path: "/categories/:id/article", element: <ArticleByCategory /> },
  ]);
}

export default AppRoutes;
