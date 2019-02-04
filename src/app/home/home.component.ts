import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { FirebaseStorageService } from '../shared/services/firebase-storage.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild(CalendarComponent) calendar: CalendarComponent;

    constructor(
        public authenticationService: AuthenticationService,
        private firebaseStorageService: FirebaseStorageService,
    ) {
    }

    ngOnInit() {
    }

    logout() {
        this.authenticationService.signOut();
    }

    daySelected(event) {
        console.log(event);
    }

    synchronize() {
        this.firebaseStorageService.synchronize();
    }
}
