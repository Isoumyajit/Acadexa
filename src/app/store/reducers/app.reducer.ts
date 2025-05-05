import { ActionReducerMap } from '@ngrx/store';
import * as USER_REDUCER from '../reducers/user.reducer';

export interface AppState {
  [USER_REDUCER.reducerKey]: USER_REDUCER.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  [USER_REDUCER.reducerKey]: USER_REDUCER.userReducer,
};

export const hydratedStates = [USER_REDUCER.reducerKey];
