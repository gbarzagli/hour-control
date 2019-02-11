import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';
import { Subscription } from 'rxjs';

@Injectable()
export class FirebaseStorageService implements OnDestroy {

    private subscription: Subscription;

    constructor(
        private authenticationService: AuthenticationService,
        private storageService: StorageService,
        private utilService: UtilService,
        private ngFireDatabase: AngularFireDatabase
    ) {
        this.ngFireDatabase.list(`hour-control/${this.authenticationService.user.uid}`).valueChanges().subscribe(
            data => {
                this.storageService.save(data);
                const totalBalance = this.utilService.calculateTotalBalance();
                const totalBalanceStr = this.utilService.formatBalance(totalBalance);
                this.storageService.hourBalance = totalBalanceStr;
            }
        );
    }

    synchronize() {
        this.ngFireDatabase.list(`hour-control`).set(`${this.authenticationService.user.uid}`, this.storageService.store);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
