import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  {
    path: 'registration',
    async loadComponent() {
      const m = await import(
        './libs/shared/components/registration-form/registration-form.component'
      );
      return m.RegistrationFormComponent;
    },
  },
  {
    path: 'login',
    async loadComponent() {
      const m = await import(
        './libs/shared/components/login-form/login-form.component'
      );
      return m.LoginFormComponent;
    },
  },
];
