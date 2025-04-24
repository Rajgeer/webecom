import { Navigate, Outlet } from "react-router-dom"
import PropTypes from "prop-types";
import { selectCurrentToken, selectCurrentUser } from "../../features/authSlice";
import { useAppSelector } from "../store";
// eslint-disable-next-line no-unused-vars
function ProtectedRoutes({allowedRoles, layout: Layout  }) {
  const authUser = useAppSelector(selectCurrentUser);
  const authToken = useAppSelector(selectCurrentToken); 
  const result = authUser?.roles&&Object.keys(authUser?.roles)
  ?.map(role => allowedRoles?.includes(role)).find(val => val === true);
  
  if (!authUser) return <Navigate to="/login" replace />;
 
  if (!result) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <Layout token={authToken} user={authUser?.data}>
      <Outlet />
    </Layout>
  )
}
ProtectedRoutes.propTypes={
  allowedRoles:PropTypes.array,
  layout:PropTypes.func
}
export default ProtectedRoutes;