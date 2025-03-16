import { createAction } from '@ngrx/store';
import { User } from '../../libs/shared/models/user.model';

export const CREATE_USER = createAction(
  '[UseActions] AMA_APP Create User',
  (userData: Partial<User>) => ({ userData })
);
export const UPDATE_USER = createAction(
  '[UseActions] AMA_APP Update User',
  (userData: User) => ({ userData })
);
export const DELETE_USER = createAction(
  '[UseActions] AMA_APP Delete User',
  (id: string) => ({ id })
);

export const USER_CREATION_SUCCESS = createAction(
  '[UseActions] AMA_APP User Creation Success'
);

export const USER_CREATION_FAILURE = createAction(
  '[UseActions] AMA_APP User Creation Failure',
  (error: Error) => ({ error })
);

export const userActionTypes = {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_CREATION_SUCCESS,
  USER_CREATION_FAILURE,
};
