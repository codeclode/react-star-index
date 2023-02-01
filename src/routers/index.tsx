import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Index } from "./indexRoute";
import { DashBoard } from "./dashboardRoute";
import { Documents } from "./documentsRoute";
import { NotFoundTitle } from "./errorRoute";
import { DocumentDetail } from "./documentsRoute/documentDetail";
import { CommentShow } from "./commentsRoute";
import { WebsiteInformation } from "./websiteRoute";
import ChartFrame from "./dashboardRoute/chartFrame/chartFrame";
export var routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundTitle />,
    children: [
      {
        errorElement: <NotFoundTitle />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "dashboard",
            element: <DashBoard />,
            children: [
              {
                index: true,
                element: <ChartFrame />,
              },
            ],
          },
          {
            path: "website",
            element: <WebsiteInformation />,
          },
          {
            path: "documents",
            element: <Documents />,
          },
          {
            path: "documentDetail/:documentId",
            element: <DocumentDetail />,
          },
          {
            path: "comments",
            element: <CommentShow />,
          },
        ],
      },
    ],
  },
]);
