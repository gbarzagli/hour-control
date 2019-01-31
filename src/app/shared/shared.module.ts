import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarService } from './services/calendar.service';
import { StorageService } from './services/storage.service';
import { MessagingService } from './services/messaging.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        CalendarService, StorageService,
        MessagingService
    ]
})
export class SharedModule {}
