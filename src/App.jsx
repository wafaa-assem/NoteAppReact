import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { Home } from "./Pages/Home/Home";
import { NotFound } from "./Components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./Context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";
import { ProtectedAuth } from "./Components/ProtectedAuth/ProtectedAuth";

//create client
const queryClient = new QueryClient();

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              {" "}
              <Home />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedAuth>
              {" "}
              <Login />{" "}
            </ProtectedAuth>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuth>
              {" "}
              <Register />{" "}
            </ProtectedAuth>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={route} />
          <ToastContainer />
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
