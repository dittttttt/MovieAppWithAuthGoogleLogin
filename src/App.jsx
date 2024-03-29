import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./dashboard.jsx";
import TopRated from "./topRated/topRated.jsx";
import Detail from "./detailItems.jsx";
import Popular from "./popular/popular.jsx";
import Upcoming from "./upcoming/upcoming.jsx";
import ResultSearch from "./search/resultSearch.jsx";
import DetailSearch from "./search/detailSearch.jsx";

export default function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/top-rated", element: <TopRated /> },
    { path: "/detail", element: <Detail /> },
    { path: "/popular", element: <Popular /> },
    { path: "/upcoming", element: <Upcoming /> },
    { path: "/resultSearch", element: <ResultSearch /> },
    { path: "/detailSearch", element: <DetailSearch /> },
  ]);
  return <RouterProvider router={router} />;
}
