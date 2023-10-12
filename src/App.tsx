import { useEffect } from 'react';
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import ReportsIndex from '@/pages/reports/Index';
import ReportsCompany from '@/pages/reports/Company';
import Container from './pages/Container';
import EmptyIndex from './pages/empty/Index';
import Empty from './pages/empty/Empty';

function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <Container />,
      children: [
        {
          path: "/reports",
          element: <ReportsIndex />,
          children: [
            {
              path: "company",
              element: <ReportsCompany />
            },
            {
              path: "deals",
              element: <Empty />
            },
            {
              path: "workers",
              element: <Empty />
            }
          ]
        },
        {
          path: "/archive",
          element: <EmptyIndex />,
        },
        {
          path: "/calendar",
          element: <EmptyIndex />,
        },
        {
          path: "/database",
          element: <EmptyIndex />,
        },
        {
          path: "/persons",
          element: <EmptyIndex />,
        },
        {
          path: "/settings",
          element: <EmptyIndex />,
        },
        {
          path: "/statistic",
          element: <EmptyIndex />,
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App;