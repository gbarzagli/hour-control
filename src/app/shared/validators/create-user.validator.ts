import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

/**
 * Validate if the password and its confirmation matches.
 * @param control 
 */
export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && (password.value !== confirmPassword.value)) {
        return { 'passwordsNotMatch': true };
    }
    return null;
};