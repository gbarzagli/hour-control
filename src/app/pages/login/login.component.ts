import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { User } from 'src/app/shared/models/user.model';
import { isNullOrUndefined } from 'util';
import { passwordValidator } from 'src/app/shared/validators/create-user.validator';

class UserForm {
    email: string = null;
    password: string = null;
    confirmPassword: string = null;

    private isEmailFilled = () => !isNullOrUndefined(this.email) && this.email !== "";
    private isPasswordFilled = () => !isNullOrUndefined(this.password) && this.password !== "";
    private isConfirmPasswordFilled = () => !isNullOrUndefined(this.confirmPassword) && this.confirmPassword !== "";

    isEmailValid() {
        if (this.isEmailFilled()) {
            return /(\w+\.*\w+)@(\w+\.+\w+(\.\w+)*)/g.test(this.email);
        }
        return false;
    }

    isFormValid(): boolean {
        return this.isEmailValid()
            && this.isPasswordFilled()
            && this.isConfirmPasswordFilled()
            && this.password === this.confirmPassword;
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User;
    form: FormGroup;

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.user = new User();
        this.form = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required)
        }, passwordValidator);
    }

    login() {
        this.authenticationService.signInToFirebase(this.user);
    }
}
