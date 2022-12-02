import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFound";
import Rootlayout from "../components/Rootlayout";

import Movies from "../modules/Movies";
import MovieAdd from "../modules/Movies/movieAdd";

import AddUser from "../modules/Users/AddUser/AddUser";
import SignIn from "../modules/SignIn/SignIn";
import User from "../modules/Users/User";
import Access from "../modules/Access/Access";
import Home from "../modules/Home";
import AdminProtected from "./AdminProtected";
import AddSchedule from "../modules/AddSchedule/AddSchedule";

const routes = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //       <Rootlayout/>
  //   ),
  //   children: [
  //     { path: "/adLogIn/hi", element: <SignIn /> },
  //     { path: "/user", element: <User /> },
  //     { path: "/addUser",element: <AddUser />},
  //     {
  //       path: "/movie",
  //       element: <Movies />,
  //     },
  //     { path: "/movieAdd", element: <MovieAdd /> },
  //   ],
  // },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },

  {
    path: "/",
    element: <Access />
  },

  {
    path: "/logIn",
    element: <SignIn />,
  },

  {
    path: "/admin",
    element: <AdminProtected><Rootlayout /></AdminProtected> ,
    children: [
      {path: "/admin", element: <Home />},
      {path: "/admin/users",element: <User />},
      {path: "/admin/addUsers",element: <AddUser />},
      {path: "/admin/movies",element: <Movies />},
      {path: "/admin/addMovies",element: <MovieAdd />},
      {path: "movies/:movieId",element: <AddSchedule />}
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default routes;
