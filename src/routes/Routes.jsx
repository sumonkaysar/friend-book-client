import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import About from "../pages/About";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Media from "../pages/Media/Media";
import PostDetails from "../pages/Media/PostDetails/PostDetails";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'media',
        loader: () => fetch('http://localhost:5000/posts'),
        element: <Media />,
      },
      {
        path: 'post-details/:id',
        element: <PostDetails />,
      },
      {
        path: 'about',
        element: <PrivateRoute><About /></PrivateRoute>,
      },
    ]
  }
]);

export default router;