import { createAction } from '@ngrx/store';
import { User } from '../../libs/shared/models/user.model';

const CREATE_USER = createAction(
  '[UseActions] AMA_APP Create User',
  (userData: Partial<User>) => ({ userData })
);
const UPDATE_USER = createAction(
  '[UseActions] AMA_APP Update User',
  (userData: User) => ({ userData })
);
const DELETE_USER = createAction(
  '[UseActions] AMA_APP Delete User',
  (id: string) => ({ id })
);

const USER_LOGIN_ACTION = createAction(
  '[UseActions] AMA_APP User Login Action',
  (username: string, password: string) => ({ username, password })
);

const USER_CREATION_SUCCESS = createAction(
  '[UseActions] AMA_APP User Creation Success'
);

const USER_CREATION_FAILURE = createAction(
  '[UseActions] AMA_APP User Creation Failure',
  (error: Error) => ({ error })
);

const USER_LOGIN_ACTION_SUCCESS = createAction(
  '[UseActions] AMA_APP User Login Action Success',
  (user: string) => ({ user })
);

const USER_SAVE_STATE_ACTION = createAction(
  '[UseActions] AMA_APP User Save State Action',
  (user: User) => ({ user })
);

export const userActionTypes = {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_LOGIN_ACTION,
  USER_CREATION_SUCCESS,
  USER_CREATION_FAILURE,
  USER_LOGIN_ACTION_SUCCESS,
  USER_SAVE_STATE_ACTION,
};
