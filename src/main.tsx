import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { routes } from "./routers";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider
    theme={{
      colorScheme: "dark",
      loader: "bars",
    }}
  >
    <NotificationsProvider>
      <RouterProvider router={routes} />
    </NotificationsProvider>
  </MantineProvider>
);
