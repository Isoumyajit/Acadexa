import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { userActionTypes } from '../../../../store/actions/user.action';
import { User } from '../../models/user.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-registration-form',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HeaderComponent,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.setFormValidators();
  }

  ngOnInit(): void {}

  setFormValidators(): void {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidatorFn {
    let password = control.get('password')?.value;
    let confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ notMatched: true });
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    } else {
      const userData: Partial<User> = (({
        firstName,
        lastName,
        email,
        password,
        userName,
        phone,
      }) => ({ firstName, lastName, email, password, userName, phone }))(
        this.registrationForm.value
      );
      this.store.dispatch(userActionTypes.CREATE_USER(userData));
      this.onReset();
    }
  }

  onReset(): void {
    this.registrationForm.reset();
    this.registrationForm.get('confirmPassword')?.setErrors(null);
    this.registrationForm.get('password')?.setErrors(null);
    this.registrationForm.get('firstName')?.setErrors(null);
    this.registrationForm.get('lastName')?.setErrors(null);
    this.registrationForm.get('email')?.setErrors(null);
    this.registrationForm.get('userName')?.setErrors(null);
    this.registrationForm.get('phone')?.setErrors(null);
  }

  getValidationError(controlName: string): string {
    switch (controlName) {
      case 'firstName':
        return this.registrationForm.get('firstName')?.hasError('required')
          ? 'First Name is required'
          : '';
      case 'lastName':
        return this.registrationForm.get('lastName')?.hasError('required')
          ? 'Last Name is required'
          : '';
      case 'email':
        return this.registrationForm.get('email')?.hasError('required')
          ? 'Email is required'
          : this.registrationForm.get('email')?.hasError('email')
          ? 'Email is invalid'
          : '';
      case 'userName':
        return this.registrationForm.get('userName')?.hasError('required')
          ? 'User Name is required'
          : '';
      case 'password':
        return this.registrationForm.get('password')?.hasError('required')
          ? 'Password is required'
          : this.registrationForm.get('password')?.hasError('minlength')
          ? 'Password should be minimum 8 characters'
          : '';
      case 'confirmPassword':
        return this.registrationForm
          .get('confirmPassword')
          ?.hasError('required')
          ? 'Confirm Password is required'
          : this.registrationForm.get('confirmPassword')?.hasError('minlength')
          ? 'Confirm Password should be minimum 8 characters'
          : this.registrationForm.get('confirmPassword')?.hasError('notMatched')
          ? 'Password and Confirm Password should match'
          : '';
      case 'phone':
        return this.registrationForm.get('phone')?.hasError('required')
          ? 'Phone is required'
          : this.registrationForm.get('phone')?.hasError('minlength')
          ? 'Phone should be 10 digits'
          : this.registrationForm.get('phone')?.hasError('maxlength')
          ? 'Phone should be 10 digits'
          : '';
      default:
        return '';
    }
  }
}
