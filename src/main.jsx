import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AllTasks from "./pages/AllTasks.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import EditTask from "./pages/EditTask.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-tasks", element: <AllTasks /> },
      { path: "task/:id", element: <TaskDetails /> },
      { path: "edit-task/:id", element: <EditTask /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
