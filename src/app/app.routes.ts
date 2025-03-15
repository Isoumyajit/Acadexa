import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './libs/shared/components/registration-form/registration-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/registration', pathMatch: 'full' },
    { path: 'registration', async loadComponent() {
        const m = await import('./libs/shared/components/registration-form/registration-form.component');
        return m.RegistrationFormComponent;
    },},
];
