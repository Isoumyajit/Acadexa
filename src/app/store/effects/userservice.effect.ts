import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../libs/shared/services/user/user.service';
import { userActionTypes } from '../actions/user.action';
import { catchError, EMPTY, exhaustMap, map, of } from 'rxjs';
import { User } from '../../libs/shared/models/user.model';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class UserServiceEffects {
  private action$ = inject(Actions);
  private router = inject(Router);
  private store = inject(Store);
  constructor(private userService: UserService) {}

  createUser$ = createEffect(
    () =>
      this.action$?.pipe(
        ofType(userActionTypes.CREATE_USER),
        exhaustMap((action: any) =>
          this.userService.createUser(action.userData).pipe(
            map((user: User) => {
              this.store.dispatch(userActionTypes.USER_CREATION_SUCCESS());
              return EMPTY;
            }),
            catchError((error: Error) => {
              this.store.dispatch(userActionTypes.USER_CREATION_FAILURE(error));
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );

  getUser$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(userActionTypes.USER_LOGIN_ACTION),
        exhaustMap((action: any) =>
          this.userService
            .authenticateUser(action.username, action.password)
            .pipe(
              map((isAuthenticated: boolean) => {
                if (isAuthenticated) {
                  this.router.navigate(['/dashboard']);
                } else {
                  console.log('User not authenticated');
                }
                return EMPTY;
              }),
              catchError((error: Error) => {
                console.log('Error in authenticating user', error);
                return EMPTY;
              })
            )
        )
      ),
    { dispatch: false }
  );
}
