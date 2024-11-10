import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BasePage } from "./pages/BasePage";
import { StartPage } from "./pages/StartPage";
import { SearchPage } from "./pages/SearchPage";
import { MapPage } from "./pages/MapPage";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "*",
    element: <BasePage />,
    children: [
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "main",
        element: <StartPage />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
    ],
  },
]);

export default App;
