import { Component, effect } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { userActionTypes } from '../../../../store/actions/user.action';
import { userDemographicDetails } from '../../../../store/selectors/userdetails.selector';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EXAMS } from '../../constants/constants';
import { Exam } from '../../models/exams.model';

@Component({
  selector: 'app-profile',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDividerModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  isDisabled = true;
  profileForm!: FormGroup;
  userProfileData!: Partial<User>;
  exams: Exam[] = EXAMS;
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
      userName: [{ value: this.userProfileData.userName, disabled: true }],
      phone: [{ value: this.userProfileData.phone, disabled: this.isDisabled }],
      address: [{ value: '', disabled: this.isDisabled }],
      school: [{ value: '', disabled: this.isDisabled }],
      target: [{ value: '', disabled: this.isDisabled }],
    });
  });

  toggleEdit() {
    this.isDisabled = !this.isDisabled;
    this.profileForm.get('phone')?.enable();
    this.profileForm.get('address')?.enable();
    this.profileForm.get('school')?.enable();
    this.profileForm.get('target')?.enable();
    this.profileForm
      .get('phone')
      ?.addValidators([Validators.maxLength(10), Validators.minLength(10)]);
  }
  saveChanges() {
    const updatedUser: Partial<User> = (({ userName, phone }) => ({
      userName,
      phone,
    }))(this.profileForm.value);
    this.store.dispatch(userActionTypes.UPDATE_USER(updatedUser));
  }

  getErrorMessage(controlName: string) {
    switch (controlName) {
      case 'userName':
        return 'Please enter a valid username';
      case 'phone':
        if (
          this.profileForm.get('phone')?.hasError('maxlength') ||
          this.profileForm.get('phone')?.hasError('minlength')
        ) {
          return 'Please enter a valid 10 digit phone number';
        } else return '';

      default:
        return '';
    }
  }
}
