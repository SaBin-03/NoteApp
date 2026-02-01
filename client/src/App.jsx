import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Note from "./components/Note";
import ProtectRoute from "./context call/ProtectedRoute";
import PublicRoute from "./context call/PublicRoute";

const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: (
            <Home />
      )
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
            <Login />
        </PublicRoute>
      )
    },
    {
      path: "/register",
      element:(
        <PublicRoute>
            <Register />
        </PublicRoute>
      )
    },
    {
      path: "/note-making",
      element: (
        <ProtectRoute>
          {" "}
          <Note />{" "}
        </ProtectRoute>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};

export default App;
