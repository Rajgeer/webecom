import { Suspense, lazy } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./app/routes/proteced";
import PublicRoutes from "./app/routes/public";
import UserLayout from "./layout/userLayout";
import AdminLayout from "./layout/adminLayout";
import Splash from "./components/splash";
// eslint-disable-next-line no-unused-vars
const withSuspense = (WrapedComponent) => {
  return (props) => (
    <Suspense fallback={<Splash />}>
      <WrapedComponent {...props} />
    </Suspense>
  );
}
const HomePage = withSuspense(lazy(() => import("./pages/home.page")));
const LoginPage = withSuspense(lazy(() => import("./pages/login.page")));
const RegisterPage = withSuspense(lazy(() => import("./pages/register.page")));
const PageNotFound = withSuspense(lazy(() => import("./pages/notfound.page")));
const CreateProduct = withSuspense(lazy(() => import("./pages/dashboard.page")));

const router = createBrowserRouter([
  { path:'/',
    element:<PublicRoutes layout={(UserLayout)} />,
    children:[
      { index:true, element:(<HomePage />) },
      { path: "/login", element:(<LoginPage />) },
      { path: "/register", element:(<RegisterPage />) },
    ]
  },
  
  { path: "*", element:(<PageNotFound />) },
  
  {
    path:'/dashboard', 
    element:(<ProtectedRoutes allowedRoles={['admin', 'user']} layout={(AdminLayout)}/>),
    children:[
      {index: true, element:(<CreateProduct />)},
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
