import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class UtilService {
    constructor(private storageService: StorageService) {}

    private calculateBalance(hours, minutes) {
        minutes = hours * 60 + minutes;
        hours = (minutes - (minutes % 60)) / 60;
        minutes = minutes % 60;

        const isNegative = hours < 0 || minutes < 0;
        minutes = Math.abs(minutes);
        hours = Math.abs(hours);

        return { hours, minutes, isNegative };
    }

    public calculateDailyBalance(day) {
        const daily = this.storageService.dailyHoursTime;
        daily.hours = daily.hours + 1;

        const minutes   = day.endTime.minutes
                        - day.startTime.minutes
                        - daily.minutes;

        const hours     = day.endTime.hours
                        - day.startTime.hours
                        - daily.hours;

        return this.calculateBalance(hours, minutes);
    }

    public calculateTotalBalance() {
        const balances  = this.storageService.store.map(day => day.balanceTime);

        const hours     = balances.map(balance => balance.hours)
                                  .reduce((last, next) => last + next);
        const minutes   = balances.map(balance => balance.minutes)
                                  .reduce((last, next) => last + next);

        return this.calculateBalance(hours, minutes);
    }

    public formatBalance(dailyBalance) {
        const strHour = dailyBalance.hours < 10 ? '0' + dailyBalance.hours : dailyBalance.hours;
        const strMinute = dailyBalance.minutes < 10 ? '0' + dailyBalance.minutes : dailyBalance.minutes;
        return  `${dailyBalance.isNegative ? '-' : ''}${strHour}:${strMinute}`;
    }
}
