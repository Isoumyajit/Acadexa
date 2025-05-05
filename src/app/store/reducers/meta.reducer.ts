import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import {
  STATE_PREFIX,
  StorageWrapper,
} from '../../libs/shared/services/state-wrapper/srorage-wrapper.service';
import { hydratedStates } from './app.reducer';
import { userActionTypes } from '../actions/user.action';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: hydratedStates,
    storageKeySerializer: (key) => STATE_PREFIX + `${key}`,
    rehydrate: true,
    removeOnUndefined: true,
    storage: new StorageWrapper(),
  })(reducer);
}

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action === userActionTypes.USER_LOGOUT_SUCCESS) {
      return reducer(undefined, action);
    } else return reducer(state, action);
  };
}
