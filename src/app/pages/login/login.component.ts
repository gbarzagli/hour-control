import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { User } from 'src/app/shared/models/user.model';
import { passwordValidator } from 'src/app/shared/validators/create-user.validator';

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

    createUser(form: any) {
        this.authenticationService.signUpToFirebase(form);
    }
}
