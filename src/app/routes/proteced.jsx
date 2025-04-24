import { Navigate, Outlet } from "react-router-dom"
import { selectCurrentUser } from "../../features/authSlice";
import { useAppSelector } from "../store";
// eslint-disable-next-line no-unused-vars
function ProtectedRoutes({allowedRoles}) {
  const authUser = useAppSelector(selectCurrentUser);
  
  if (!authUser) return <Navigate to="/login" replace />;

  return allowedRoles.includes(authUser?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
}

export default ProtectedRoutes;