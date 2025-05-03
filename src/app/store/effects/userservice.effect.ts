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

  authenticateUser$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(userActionTypes.USER_LOGIN_ACTION),
        exhaustMap((action: any) =>
          this.userService
            .authenticateUser(action.username, action.password)
            .pipe(
              map((isAuthenticated: boolean) => {
                if (isAuthenticated) {
                  this.store.dispatch(
                    userActionTypes.USER_LOGIN_ACTION_SUCCESS(action.username)
                  );
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

  getUser$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(userActionTypes.USER_LOGIN_ACTION_SUCCESS),
        exhaustMap((action: any) =>
          this.userService.getUser(action.user).pipe(
            map((user: User) => {
              this.store.dispatch(
                userActionTypes.USER_SAVE_STATE_ACTION(user[0])
              );
              return EMPTY;
            }),
            catchError((error: Error) => {
              console.log('Error in getting user data', error);
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(userActionTypes.UPDATE_USER),
        exhaustMap((action: any) =>
          this.userService.updateUser(action.userData).pipe(
            map((user: User) => {
              this.store.dispatch(userActionTypes.UPDATE_USER_SUCCESS(user));
              return EMPTY;
            }),
            catchError((error: Error) => {
              this.store.dispatch(userActionTypes.UPDATE_USER_FAILURE(error));
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );
}
