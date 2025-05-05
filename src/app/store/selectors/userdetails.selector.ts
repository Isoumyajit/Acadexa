import { createSelector } from '@ngrx/store';
import { User } from '../../libs/shared/models/user.model';
import { AppState } from '../reducers/app.reducer';

const user = (state: AppState) => state.user;

export const userDemographicDetails = createSelector(
  user,
  (details: User) =>
    ({
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      userName: details.userName,
      phone: details.phone,
    } as Partial<User>)
);
