import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFound";
import Rootlayout from "../components/Rootlayout";

import Movies from "../modules/Movies";
import MovieAdd from "../modules/Movies/movieAdd";
import SignIn from "../modules/SignIn";

import User from "../modules/Users/User";
import AdminProtected from "./AdminProtected";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      // <AdminProtected>
      <Rootlayout />
      // {/* </AdminProtected> */}
    ),
    children: [
      { path: "/", element: <User /> },
      {
        path: "/movie",
        element: <Movies />,
      },
      { path: "/movieAdd", element: <MovieAdd /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
