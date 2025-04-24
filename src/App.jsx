import { Suspense, lazy } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./app/routes/proteced";
import PublicRoutes from "./app/routes/public";
import UserLayout from "./layout/userLayout";
// import AdminLayout from "./layout/adminLayout";
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
const ProductDetailPage = withSuspense(lazy(() => import("./pages/productDetail.page")));
const CartPage = withSuspense(lazy(() => import("./pages/cart.page")));
// const VideoById  = withSuspense(lazy(() => import("./components/videos/videoById")));
// const RequireAuth = withSuspense(lazy(()=> import('./features/auth/RequireAuth')));
// const UserProfile = withSuspense(lazy(() => import('./features/users/UserProfile')));
// const RootLayout = withSuspense(lazy(() => import('./dashboard/DashboardLayout')));
// const DashLanding = withSuspense(lazy(() => import('./dashboard/Landing')));
// const CategoriesPage  = withSuspense(lazy(() => import('./dashboard/categories')));
// const CourseListPage = withSuspense(lazy(() => import('./pages/courseList')));
// const CourseList = withSuspense(lazy(()=> import('./features/course/course.list')));


const router = createBrowserRouter([
  { path:'/',
    element:<PublicRoutes layout={(UserLayout)} />,
    children:[
      { index:true, element:(<HomePage />) },
      // {path:'/video/:id', element:(<VideoById />)},
      { path: "/login", element:(<LoginPage />) },
      { path: "/signup", element:(<RegisterPage />) },
      {
        path:"/product/:id", element:(<ProductDetailPage />)
      },
      {
        path:"/cart", element:(<CartPage />)
      }
      // { path: "/course", element:(<CourseListPage />)},
    ]
  },
  
  // {
  //   element:(<ProtectedRoutes allowedRoles={['User']} layout={(UserLayout)} />),
  //   children:[
  //     {path:'/profile', element:(<UserProfile />)},
      
  //   ]
  // },
  { path: "*", element:(<PageNotFound />) },
  
  // {
  //   path:'/dashboard', 
  //   element:(<ProtectedRoutes allowedRoles={['Admin']} layout={(AdminLayout)}/>),
  //   children:[
  //     {index: true, element:(<DashLanding />)},
  //     {
  //       path:'category', element:(<CategoriesPage />)
  //     },
  //     {
  //       path:'course', element:(<CourseList/>)
  //     }
      
  //   ]
  // }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
