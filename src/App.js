import { Suspense } from "react";
import Home from "./pages/home/Home";
import MainLayout from "./components/Layouts/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import NotFound from "./pages/not-found/NotFound";
import Login from "./pages/Login/Login";
import SignUp from "./pages/signup/SignUp";
import AuthLayout from "./components/Layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingPage />}>
                <Home />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <AuthLayout />,
      children: [
        {
          path: "/dashboard/login",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/dashboard/register",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <SignUp />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
