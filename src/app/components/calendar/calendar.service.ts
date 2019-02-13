import { Injectable } from '@angular/core';

@Injectable()
export class CalendarService {
    private static readonly MONTH_DESCRIPTIONS = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];



    private month: number = new Date().getMonth();
    private year: number = new Date().getFullYear();

    constructor() {}

    public getMonthDescription(month) {
        return CalendarService.MONTH_DESCRIPTIONS[month];
    }

    public buildMonth(month: number, year: number, hourControl?) {
        const days = [
            new Array(7),
            new Array(7),
            new Array(7),
            new Array(7),
            new Array(7),
            new Array(7)
        ];
        const previousDay = new Date(year, month, 0);

        let firstDay = new Date(year, month, 1);
        let previousDate = previousDay.getDate();
        let column = firstDay.getDay();
        let line = 0;

        // Get last days from the previous month
        for (let i = 1; i <= column; i++) {
            days[line][column - i] = {
                date: previousDate--,
                month: previousDay.getMonth(),
                year: year,
                active: false
            };
        }

        // get the length of days in the month by getting its last day
        const length = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= length; i++) {
            if (column === 7) {
                column = 0;
                line++;
            }

            const hours = hourControl
                ? hourControl.filter(d => d.date === i && d.month === month)[0]
                : undefined;
            const start = hours ? hours.start : undefined;
            const end = hours ? hours.end : undefined;
            days[line][column++] = {
                date: i,
                month: month,
                year: year,
                active: true,
                start: start,
                end: end
            };
        }

        firstDay = new Date(year, month + 1, 1);
        let day = firstDay.getDate();
        for (let i = line; i < 6; i++) {
            for (let j = column; j < 7; j++) {
                days[i][j] = {
                    date: day++,
                    month: firstDay.getMonth(),
                    year: year,
                    active: false
                };
            }
            column = 0;
        }

        return days;
    }
}
