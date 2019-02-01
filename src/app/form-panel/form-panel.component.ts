import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Day } from '../shared/models/day.model';
import { MessagingService } from '../shared/services/messaging.service';
import { StorageService } from '../shared/services/storage.service';
import { Time } from '@angular/common';

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
        private storageService: StorageService
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

            const dailyBalance = this.calculateDailyBalance();

            let strHour = dailyBalance.hours < 10 ? '0' + dailyBalance.hours : dailyBalance.hours;
            let strMinute = dailyBalance.minutes < 10 ? '0' + dailyBalance.minutes : dailyBalance.minutes;

            this.day.balance = dailyBalance.isNegative ? `-${strHour}:${strMinute}` : `${strHour}:${strMinute}`;
            this.storageService.store = this.day;

            const totalBalance = this.calculateTotalBalance();

            strHour = totalBalance.hours < 10 ? '0' + totalBalance.hours : totalBalance.hours;
            strMinute = totalBalance.minutes < 10 ? '0' + totalBalance.minutes : totalBalance.minutes;

            this.hourBalance = `${totalBalance.isNegative ? '-' : ''}${strHour}:${strMinute}`;
            this.storageService.hourBalance = this.hourBalance;

            this.messagingService.messaging = this.day;
        } else {
            alert(
                'Você precisa selecionar dia, digitar hora inicio e hora fim para salvar.'
            );
        }
    }

    calculateDailyBalance() {
        const daily = this.storageService.dailyHoursTime;
        daily.hours = daily.hours + 1;

        let minutes =
            this.day.endTime.minutes -
            this.day.startTime.minutes -
            daily.minutes;
        let hours =
            this.day.endTime.hours -
            this.day.startTime.hours -
            daily.hours;

        minutes = hours * 60 + minutes;
        hours = (minutes - (minutes % 60)) / 60;
        minutes = minutes % 60;

        const isNegative = hours < 0 || minutes < 0;
        minutes = Math.abs(minutes);
        hours = Math.abs(hours);

        return { hours, minutes, isNegative };
    }

    calculateTotalBalance() {
        const balances = this.storageService.store.map(day => day.balanceTime);
        let hours = balances.map(balance => balance.hours)
                            .reduce((last, next) => last + next);
        let minutes = balances.map(balance => balance.minutes)
                              .reduce((last, next) => last + next);

        minutes = hours * 60 + minutes;
        hours = (minutes - (minutes % 60)) / 60;
        minutes = minutes % 60;

        const isNegative = hours < 0 || minutes < 0;
        hours = Math.abs(hours);
        minutes = Math.abs(minutes);

        return { hours, minutes, isNegative };
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
