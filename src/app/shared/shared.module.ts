import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageService } from './services/storage.service';
import { MessagingService } from './services/messaging.service';
import { AuthenticationService } from './services/authentication.service';
import { FirebaseStorageService } from './services/firebase-storage.service';
import { CalendarService } from '../calendar/calendar.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        AuthenticationService, CalendarService,
        MessagingService, StorageService,
        FirebaseStorageService
    ]
})
export class SharedModule {}
