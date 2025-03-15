import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../libs/shared/services/user/user.service';
import { userActionTypes } from '../actions/user.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { User } from '../../libs/shared/models/user.model';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class UserServiceEffects {
  private action$ = inject(Actions);
  constructor(private userService: UserService) {}

  createUser$ = createEffect(() =>
    this.action$?.pipe(
      ofType(userActionTypes.CREATE_USER),
      mergeMap((action: any) =>
        this.userService.createUser(action.userData).pipe(
          map((user: User) => {
            return userActionTypes.USER_CREATION_SUCCESS();
          })
        )
      )
    )
  );
}
