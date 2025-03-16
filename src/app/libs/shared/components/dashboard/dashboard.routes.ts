export const dashBoardRoutes = [
  {
    path: 'dashboard',
    async loadComponent() {
      return import('./dashboard.component').then((m) => m.DashboardComponent);
    },
  },
];
