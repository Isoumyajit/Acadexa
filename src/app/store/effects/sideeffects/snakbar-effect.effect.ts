import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActionTypes } from '../../actions/user.action';
import { of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnakbarEffect {
  private actions$ = inject(Actions);
  private snakBar = inject(MatSnackBar);

  constructor() {}

  snakbarMessageEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActionTypes.USER_CREATION_SUCCESS),
        tap(() => {
          this.snakBar.open('User Created Successfully', 'Close');
          return this.actions$;
        })
      ),
    { dispatch: false }
  );
}
