import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageService } from './services/storage.service';
import { MessagingService } from './services/messaging.service';
import { AuthenticationService } from './services/authentication.service';
import { FirebaseStorageService } from './services/firebase-storage.service';
import { UtilService } from './services/util.service';
import { AuthenticationGuard } from './services/authentication.guard';
import { CalendarService } from '../components/calendar/calendar.service';

import { NgxElectronModule } from 'ngx-electron';

@NgModule({
    imports: [CommonModule, NgxElectronModule],
    exports: [NgxElectronModule],
    providers: [
        AuthenticationService, CalendarService,
        MessagingService, StorageService,
        FirebaseStorageService, UtilService,
        AuthenticationGuard
    ]
})
export class SharedModule {}
