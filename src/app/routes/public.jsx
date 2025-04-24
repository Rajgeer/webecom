import { Outlet } from "react-router-dom"
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
function PublicRoutes({layout: Layout  }) {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
PublicRoutes.propTypes={
  allowedRoles:PropTypes.array,
  layout:PropTypes.func
}
export default PublicRoutes;