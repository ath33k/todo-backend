import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { TasksProvider } from "./context/TasksProvider";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";

const routers = createBrowserRouter(
  [
    {
      path: "/signin",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: (
        <TasksProvider>
          <HomePage />
        </TasksProvider>
      ),
    },
  ],
  { basename: "/app" }
);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
