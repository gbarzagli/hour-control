import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.authenticationService.handleRedirect();
    }

    login() {
        this.authenticationService.signInWithGoogleAuth();
    }
}
