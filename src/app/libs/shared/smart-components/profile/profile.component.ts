import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { userDemographicDetails } from '../../../../store/selectors/userdetails.selector';
import { CommonModule } from '@angular/common';
import { userActionTypes } from '../../../../store/actions/user.action';
import { studentProfileAction } from '../../../../store/actions/student-profile.action';

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
  userDetails$: Observable<Partial<User>>;
  isDisabled = true;
  profileForm!: FormGroup;
  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.userDetails$ = this.store.select(userDemographicDetails);
    this.initializeForm();
  }
  initializeForm() {
    this.store.dispatch(
      studentProfileAction.STUDENT_PROFILE_INITIALIZE_ACTION(this.profileForm)
    );
  }

  toggleEdit() {
    this.isDisabled = !this.isDisabled;
    this.profileForm.get('email')?.enable();
    this.profileForm.get('username')?.enable();
    this.profileForm.get('phone')?.enable();
  }
  saveChanges() {
    const updatedUser: Partial<User> = (({
      firstName,
      lastName,
      email,
      userName,
      phone,
    }) => ({ firstName, lastName, email, userName, phone }))(
      this.profileForm.value
    );

    this.store.dispatch(userActionTypes.UPDATE_USER(updatedUser));
    this.isDisabled = true;
    this.profileForm.get('email')?.disable();
    this.profileForm.get('username')?.disable();
    this.profileForm.get('phone')?.disable();
  }
}
