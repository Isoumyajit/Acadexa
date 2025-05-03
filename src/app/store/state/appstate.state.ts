import { combineReducers } from '@ngrx/store';
import { userReducer } from '../reducers/user.reducer';
import { User } from '../../libs/shared/models/user.model';

export const Reducers = combineReducers({
  user: userReducer,
});

export interface AppState {
  user: User;
}
