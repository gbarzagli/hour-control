import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FirebaseStorageService } from 'src/app/shared/services/firebase-storage.service';

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

    daySelected(event) {
        console.log(event);
    }

    synchronize() {
        this.firebaseStorageService.synchronize();
    }
}
