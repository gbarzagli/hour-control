import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Day } from '../shared/models/day.model';
import { MessagingService } from '../shared/services/messaging.service';
import { StorageService } from '../shared/services/storage.service';
import { Time } from '@angular/common';
import { UtilService } from '../shared/services/util.service';

@Component({
    selector: 'app-form-panel',
    templateUrl: './form-panel.component.html',
    styleUrls: ['./form-panel.component.scss']
})
export class FormPanelComponent implements OnInit, OnDestroy {
    day: Day;

    dailyHours: string;

    start: string;
    end: string;

    hourBalance: string;

    private subscription: Subscription;

    constructor(
        private messagingService: MessagingService,
        private storageService: StorageService,
        private utilService: UtilService
    ) {}

    ngOnInit() {
        this.subscription = this.messagingService.messaging.subscribe(msg => {
            if (msg) {
                this.day = new Day(msg);
                this.start = msg.start;
                this.end = msg.end;
            } else {
                this.start = undefined;
                this.end = undefined;
            }
        });

        this.storageService.hourBalance$.subscribe(
            balance => (this.hourBalance = balance)
        );

        this.dailyHours = this.storageService.dailyHours;
    }

    save() {
        if (this.day && this.start && this.end) {
            this.day.start = this.start;
            this.day.end = this.end;

            const dailyBalance = this.utilService.calculateDailyBalance(this.day);
            this.day.balance = this.utilService.formatBalance(dailyBalance);
            this.storageService.store = this.day;

            const totalBalance = this.utilService.calculateTotalBalance();
            this.hourBalance = this.utilService.formatBalance(totalBalance);
            this.storageService.hourBalance = this.hourBalance;

            this.messagingService.messaging = this.day;
        } else {
            alert(
                'Você precisa selecionar dia, digitar hora inicio e hora fim para salvar.'
            );
        }
    }

    setDailyHours(event) {
        this.storageService.dailyHours = event;
    }

    clear() {
        this.end = undefined;
        this.start = undefined;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
