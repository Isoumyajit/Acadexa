import { FormGroup } from '@angular/forms';
import { createAction } from '@ngrx/store';

const STUDENT_PROFILE_INITIALIZE_ACTION = createAction(
  '[StudentProfile] Initialize Student Profile',
  (form: FormGroup) => ({ form })
);

export const studentProfileAction = {
  STUDENT_PROFILE_INITIALIZE_ACTION,
};
