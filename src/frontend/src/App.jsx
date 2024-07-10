import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { TasksProvider } from "./context/TasksProvider";

const routers = createBrowserRouter([
  {
    path: "/",
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
