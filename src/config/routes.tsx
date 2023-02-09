import { useRoutes } from "react-router-dom";
import { RequireAuth } from "./requiresAuth";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Setting from "../pages/Setting";
import ArticleByCategory from "../admin/articles/ArticleByCategory";
import ArticleById from "../admin/articles/ArticleById";

function AppRoutes() {
  return useRoutes([
    {
      path: "/",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
    },
    { path: "/login", element: <Login /> },
    {
      path: "/admin",
      element: (
        <RequireAuth>
          <Admin />
        </RequireAuth>
      ),
    },
    {
      path: "/setting",
      element: (
        <RequireAuth>
          <Setting />
        </RequireAuth>
      ),
    },
    {
      path: "/article/:id",
      element: (
        <RequireAuth>
          <ArticleById />
        </RequireAuth>
      ),
    },
    {
      path: "/categories/:id/articles",
      element: (
        <RequireAuth>
          <ArticleByCategory />
        </RequireAuth>
      ),
    },
  ]);
}

export default AppRoutes;
