import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss"
import Error404 from "./components/Error404";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "https://blog-mysql-api-production.up.railway.app/api/post/:id",
        element: <Single />,
      },
      {
        path: "https://blog-mysql-api-production.up.railway.app/api/write",
        element: <Write />,
      }
    ],
    
  },
  {
    path: "https://blog-mysql-api-production.up.railway.app/api/auth/register",
    element: <Register />,
  },
  {
    path: "https://blog-mysql-api-production.up.railway.app/api/auth/login",
    element: <Login />,
  },
  {
    path: "*/",
    element: <Error404 />
  },
  {
    path: "/*",
    element: <Error404 />
  }
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
