import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

/**
 * Validate if the password and its confirmation matches.
 * @param control 
 */
export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    debugger
    if (password && confirmPassword && (password.value !== confirmPassword.value)) {
        const error = { 'passwordsNotMatch': true };
        password.setErrors(error);
        confirmPassword.setErrors(error);
        return error;
    }
    return null;
};