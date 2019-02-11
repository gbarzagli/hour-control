import { Component, OnInit } from '@angular/core';
import { StorageService } from './shared/services/storage.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'control-hour';

    private routerEvent$;


    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        // this.routerEvent$ = this.router.events.subscribe((event: Event) => {
        //     if (event instanceof NavigationEnd) {

        //     }
        // });
    }


}
