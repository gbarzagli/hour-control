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
        const { 
            date, 
            month, 
            year, 
            start, 
            end, 
            balance, 
            active 
        } = day;
        
        this.date = date;
        this.month = month;
        this.year = year;
        this.start = start;
        this.end = end;
        this.balance = balance;
        if (active) {
            this.active = active;
        }
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
            hours: isNegative ? -split[0] : split[0],
            minutes: isNegative ? -split[1] : split[1],
            isNegative
        };
    }
}
