import { Component, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { userActionTypes } from '../../../../store/actions/user.action';
import { userDemographicDetails } from '../../../../store/selectors/userdetails.selector';
import { first } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  isDisabled = true;
  profileForm!: FormGroup;
  userProfileData!: Partial<User>;
  constructor(private store: Store) {
    const data = this.store.selectSignal(userDemographicDetails);
    this.userProfileData = data();
    this.profileForm = new FormBuilder().group({});
  }

  readonly useProfileDataHandler = effect(() => {
    this.profileForm = new FormBuilder().group({
      firstName: [{ value: this.userProfileData.firstName, disabled: true }],
      lastName: [{ value: this.userProfileData.lastName, disabled: true }],
      email: [{ value: this.userProfileData.email, disabled: true }],
      userName: [
        { value: this.userProfileData.userName, disabled: this.isDisabled },
      ],
      phone: [{ value: this.userProfileData.phone, disabled: this.isDisabled }],
    });
  });

  toggleEdit() {
    this.isDisabled = !this.isDisabled;
    this.profileForm.get('userName')?.enable();
    this.profileForm.get('phone')?.enable();
  }
  saveChanges() {
    const updatedUser: Partial<User> = (({ userName, phone }) => ({
      userName,
      phone,
    }))(this.profileForm.value);
    this.store.dispatch(userActionTypes.UPDATE_USER(updatedUser));
  }
}
