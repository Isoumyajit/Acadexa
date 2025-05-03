import { createReducer, on } from '@ngrx/store';
import { User } from '../../libs/shared/models/user.model';
import { userActionTypes } from '../actions/user.action';

export const initialUserState: Partial<User> = {
  email: '',
  password: '',
  role: '',
  enabled: false,
  imageUrl: '',
  userName: '',
  firstName: '',
  lastName: '',
  phone: '',
};

export const userReducer = createReducer(
  initialUserState,
  on(userActionTypes.USER_SAVE_STATE_ACTION, (state, { user }) => user),
  on(userActionTypes.UPDATE_USER_SUCCESS, (state, { userData }) => userData)
);
