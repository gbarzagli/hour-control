import { Injectable, OnDestroy } from '@angular/core';
import { Time } from '@angular/common';
import { Observable } from 'rxjs';
import { Day } from '../models/day.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class StorageService implements OnDestroy {
    static readonly STORAGE_KEY = 'control_hour_storage';
    static readonly DAILY_HOURS = 'daily_hours';
    static readonly HOUR_BALANCE = 'hour_balance';

    private interval;

    constructor(
    ) {
        const data = localStorage.getItem(StorageService.STORAGE_KEY);
        if (data) {
            const array = JSON.parse(data);
            array.sort((a, b) =>
                (a.year < b.year)   ? -1 :
                (a.year > b.year)   ?  1 :
                (a.month < b.month) ? -1 :
                (a.month > b.month) ?  1 :
                (a.date < b.date)   ? -1 :
                (a.date > b.date)   ?  1 :
                0
            );
            localStorage.setItem(StorageService.STORAGE_KEY, JSON.stringify(array));
        } else {
            localStorage.setItem(StorageService.STORAGE_KEY, '[]');
        }
    }

    set store(data) {
        const filtered = this.store.filter(item =>
            (
                (item.year !== data.year) ||
                (item.month !== data.month) ||
                (item.date !== data.date)
            )
        );
        data = [ ...filtered, data ] ;
        this.save(data);
    }

    get store() {
        return this.retrieve();
    }

    save(data) {
        const json = JSON.stringify(data);
        localStorage.setItem(StorageService.STORAGE_KEY, json);
    }

    retrieve() {
        const json = localStorage.getItem(StorageService.STORAGE_KEY);
        const days = JSON.parse(json).map(obj => new Day(obj));
        return days || [];
    }

    get dailyHours() {
        return localStorage.getItem(StorageService.DAILY_HOURS);
    }

    set dailyHours(time) {
        localStorage.setItem(StorageService.DAILY_HOURS, time);
    }

    get dailyHoursTime(): Time {
        const dailyTime = localStorage.getItem(StorageService.DAILY_HOURS);
        const split = dailyTime.split(':').map(str => parseInt(str, 10));
        return { hours: split[0], minutes: split[1] };
    }

    get hourBalance() {
        return localStorage.getItem(StorageService.HOUR_BALANCE);
    }

    set hourBalance(time) {
        localStorage.setItem(StorageService.HOUR_BALANCE, time);
    }

    get hourBalanceTime(): Time {
        const hourBalance = localStorage.getItem(StorageService.HOUR_BALANCE);
        if (hourBalance) {
            const split = hourBalance.split(':').map(str => parseInt(str, 10));
            return { hours: split[0], minutes: split[1] };
        }
        return { hours: 0, minutes: 0 };
    }

    get hourBalance$(): Observable<string> {
        return Observable.create(observer => { setInterval(() => observer.next(this.hourBalance), 500); });
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }
}
