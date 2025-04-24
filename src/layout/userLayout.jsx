import * as React from 'react';
import Navbar from "../components/navbar";
// import Footer from "../components/footer";
import { useAppSelector } from "../app/store";
// import { useCurrentUserQuery } from "../features/users/userApiSlice";
import { selectCurrentToken } from "../features/authSlice";
import PropTypes from 'prop-types';

function UserLayout ({children}) {
    const token = useAppSelector(selectCurrentToken);
    // const {data:currentUser} = useCurrentUserQuery();
    const layout = React.useCallback(()=> {
      return(
        <>
          <Navbar token={token} />
           {children}
          {/* <Footer /> */}
        </> 
      )
    }, [token, children]);

    return layout();
}
UserLayout.propTypes={
    children: PropTypes.node
}
export default UserLayout;