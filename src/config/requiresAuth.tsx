import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isAuth = localStorage.getItem("knowledge__user");

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};
