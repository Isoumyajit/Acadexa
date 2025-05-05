import { createReducer, on } from '@ngrx/store';
import { userActionTypes } from '../actions/user.action';

export const reducerKey = 'user';
export interface UserState {
  email?: string;
  role?: string;
  enabled?: boolean;
  imageUrl?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}
export const initialUserState: UserState = {
  email: '',
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
