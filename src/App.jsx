import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./utils/store";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import Home from "./components/Home";
import ShortsPage from "./components/ShortsPage";
import SearchResults from "./components/SearchResults";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "shorts",
        element: <ShortsPage />,
      },
      {
        path: "results", 
        element: <SearchResults />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div>
        <div className="mt-18">
          <RouterProvider router={appRouter} />
        </div>
      </div>
    </Provider>
  );
}
export default App;
/*
 * Header
 * Body
 *    SideBar
 *      MenuItems
 *    MainContainer
 *      ButtonsList
 *      VideoContainer
 *        VideoCard
 *
 *
 *
 */
