import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../../pages/home-page";

export const AppRouter: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}