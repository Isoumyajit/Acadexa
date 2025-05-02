export const dashBoardRoutes = [
  {
    path: 'dashboard',
    async loadComponent() {
      return import('./dashboard.component').then((m) => m.DashboardComponent);
    },

    children: [
      {
        path: 'profile',
        async loadComponent() {
          return import(
            '../../smart-components/profile/profile.component'
          ).then((m) => m.ProfileComponent);
        },
      },
    ],
  },
];
