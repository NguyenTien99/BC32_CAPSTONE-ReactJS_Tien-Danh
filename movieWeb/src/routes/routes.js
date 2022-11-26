import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import Home from "../modules/Home";
import NotFound from "../components/NotFound";
import Movie from "../modules/Movie"
import BookingMovie from "../modules/BookingMovie/BookingMovie";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
        { path: "", element: <Home /> },
        { path: "/movie/:movieId", element: <Movie />},
        { path: "/bookingMovie/:maLichChieu", element: <BookingMovie />}
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default routes;
