import { Time } from '@angular/common';

export class Day {

    date: number = null;
    month: number = null;
    year: number = null;
    start: string = null;
    end: string = null;
    balance: string = null;
    active: boolean = null;

    constructor(day: any = {}) {
        this.date = day.date;
        this.month = day.month;
        this.year = day.year;
        this.start = day.start;
        this.end = day.end;
        this.active = day.active;
        this.balance = day.balance;
    }

    get startTime(): Time {
        const split = this.start.split(':').map(str => parseInt(str, 10));
        return { hours: split[0], minutes: split[1] };
    }

    get endTime(): Time {
        const split = this.end.split(':').map(str => parseInt(str, 10));
        return { hours: split[0], minutes: split[1] };
    }

    get balanceTime() {
        const isNegative = this.balance.charAt(0) === '-';
        const balance = this.balance.slice(1);
        const split = balance.split(':').map(str => parseInt(str, 10));
        return {
            hours: (isNegative ? -split[0] : split[0]),
            minutes: (isNegative ? -split[1] : split[1]),
            isNegative
        };
    }
}
