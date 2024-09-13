import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  console.log();

  // ask question
  if (localStorage.getItem("tkn") === null) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};
