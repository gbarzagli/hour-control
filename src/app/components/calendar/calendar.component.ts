import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    OnDestroy
} from '@angular/core';
import { CalendarService } from './calendar.service';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
    @Output() onDaySelection = new EventEmitter();

    month: number;
    year: number;
    monthYear;
    readonly weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    monthDays;
    today = new Date();
    selectedDay;

    subscription;

    constructor(
        private calendarService: CalendarService,
        private messagingService: MessagingService,
        private storageService: StorageService,
    ) {}

    ngOnInit() {
        console.log('aqq');
        this.initialize();
    }

    nextMonth() {
        if (this.month === 11) {
            this.month = 0;
            this.year++;
            return this.changeMonth();
        }
        this.month++;
        this.changeMonth();
    }

    prevMonth() {
        if (this.month === 0) {
            this.month = 11;
            this.year--;
            return this.changeMonth();
        }
        this.month--;
        this.changeMonth();
    }

    private changeMonth() {
        const monthDesc = this.calendarService.getMonthDescription(this.month);
        this.monthYear = `${monthDesc} / ${this.year}`;
        this.monthDays = this.calendarService.buildMonth(
            this.month,
            this.year,
            this.storageService.store
        );
        this.messagingService.messaging = undefined;
    }

    selectDay(day) {
        if (day.active) {
            this.selectedDay = day;
            this.onDaySelection.emit(day);
            this.messagingService.messaging = day;
        }
    }

    isToday(day): boolean {
        return (
            this.today.getDate() === day.date &&
            this.today.getMonth() === day.month &&
            this.today.getFullYear() === this.year
        );
    }

    isSelectedDay(day): boolean {
        return this.selectedDay === day;
    }

    initialize() {
        this.month = this.today.getMonth();
        this.year = this.today.getFullYear();
        this.changeMonth();

        this.subscription = this.messagingService.messaging.subscribe(msg => {
            if (msg) {
                this.monthDays.forEach(week => {
                    week.forEach(day => {
                        if (
                            day.date === msg.date &&
                            day.month === msg.month &&
                            day.year === msg.year
                        ) {
                            Object.assign(day, msg);
                        }
                    });
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
