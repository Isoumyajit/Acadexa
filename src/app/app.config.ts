import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { UserServiceEffects } from './store/effects/userservice.effect';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InterceptorService } from './libs/shared/auth/interceptor.service';
import { SnakbarEffect } from './store/effects/sideeffects/snakbar-effect.effect';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { dashBoardRoutes } from './libs/shared/components/dashboard/dashboard.routes';
import { userReducer } from './store/reducers/user.reducer';
import { Reducers } from './store/state/appstate.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([...routes, ...dashBoardRoutes]),
    provideAnimationsAsync(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', float: 'auto' },
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      },
    },
    provideHttpClient(withInterceptors([InterceptorService])),
    provideStore(Reducers),
    provideState({ name: 'user', reducer: userReducer }),
    provideEffects(UserServiceEffects, SnakbarEffect),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
