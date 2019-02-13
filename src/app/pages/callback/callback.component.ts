import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
    constructor(
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.authenticationService.handleRedirect();
    }
}
