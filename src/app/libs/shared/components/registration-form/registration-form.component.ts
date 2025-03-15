import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { userActionTypes } from '../../../../store/actions/user.action';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-registration-form',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './registration-form.component.html',
    styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.setFormValidators();
  }

  ngOnInit(): void {}

  setFormValidators(): void {
    this.registrationForm = this.formBuilder.group({
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
    });
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
    }
  }

  onReset(): void {
    this.registrationForm.reset();
  }
}
