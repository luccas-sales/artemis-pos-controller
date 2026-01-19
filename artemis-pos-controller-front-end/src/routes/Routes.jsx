import { useRoutes } from 'react-router';

import { Layout } from '../pages/Layout/Layout';

import { SalesActivity } from '../pages/SalesActivityPage/SalesActivity';
import { SalesStats } from '../pages/SalesStatsPage/SalesStats';

export function Routes() {
  const routes = useRoutes([
    {
      element: <Layout />,
      children: [
        { index: true, element: <SalesActivity /> },
        { path: '/sales-stats', element: <SalesStats /> },
      ],
    },
  ]);

  return routes;
}
