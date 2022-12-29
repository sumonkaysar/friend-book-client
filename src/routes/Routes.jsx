import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import About from "../pages/About/About";
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
        element: <PrivateRoute><PostDetails /></PrivateRoute>,
      },
      {
        path: 'about',
        element: <PrivateRoute><About /></PrivateRoute>,
      },
      {
        path: 'message',
        element: <h1 className="text-center text-3xl font-bold mb-6">Message is not developed yet</h1>,
      },
    ]
  }
]);

export default router;