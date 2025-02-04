import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import * as sessionActions from "./store/session";
import SpotsList from "./components/Spots/SpotsList";
import SpotDetail from "./components/Spots/SpotDetail";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import EditSpotForm from "./components/Spots/EditSpotForm";
import ManageSpots from "./components/Spots/ManageSpots";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/", // Landing page route
        element: <SpotsList />,
      },
      {
        path: "/spots/new", // Route for creating a new spot
        element: <CreateSpotForm />,
      },
      {
        path: "/spots/manage", // New route for managing spots
        element: <ManageSpots />,
      },
      {
        path: "/spots/:spotId", // Spot detail page route
        element: <SpotDetail />,
      },
      {
        path: "/spots/:spotId/edit", // Route for editing a spot
        element: <EditSpotForm />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
