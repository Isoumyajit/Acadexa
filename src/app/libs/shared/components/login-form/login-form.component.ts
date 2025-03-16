import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { userActionTypes } from '../../../../store/actions/user.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login-form',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private readonly store = inject(Store);
  logInForm: FormGroup;
  readonly userName: string;
  readonly password: string;

  constructor() {
    this.userName = '';
    this.password = '';
    this.logInForm = new FormGroup({
      userName: new FormControl(this.userName, Validators.required),
      password: new FormControl(this.password, Validators.required),
    });
  }

  onSubmit() {
    if (this.logInForm.valid) {
      this.store.dispatch(
        userActionTypes.USER_LOGIN_ACTION(this.userName, this.password)
      );
    }
  }

  getErrorMessage(formControlName: string): string {
    switch (formControlName) {
      case 'userName':
        if (this.logInForm.get('userName').hasError('required')) {
          return 'You must enter a value';
        } else return '';

      case 'password':
        if (this.logInForm.get('password').hasError('required')) {
          return 'You must enter a value';
        } else return '';

      default:
        return '';
    }
  }
}
