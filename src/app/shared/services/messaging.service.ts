import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Day } from '../models/day.model';

@Injectable()
export class MessagingService {

    private subject: BehaviorSubject<Day> = new BehaviorSubject(undefined);

    constructor() {}

    get messaging() {
        return this.subject.asObservable();
    }

    set messaging(day: any) {
        this.subject.next(day);
    }
}
