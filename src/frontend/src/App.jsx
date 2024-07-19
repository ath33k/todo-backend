import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { TasksProvider } from "./context/TasksProvider";
import LandingPage from "./pages/LandingPage";

const routers = createBrowserRouter([
  {
    path: "/login-page",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: (
      <TasksProvider>
        <HomePage />
      </TasksProvider>
    ),
  },
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
