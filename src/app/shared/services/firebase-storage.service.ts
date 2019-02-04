import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';

@Injectable()
export class FirebaseStorageService {
    constructor(
        private authenticationService: AuthenticationService,
        private storageService: StorageService,
        private ngFireDatabase: AngularFireDatabase
    ) {
        this.ngFireDatabase.list(`hour-control/${this.authenticationService.user.uid}`).valueChanges().subscribe(
            data => {
                this.storageService.save(data);
            }
        );
    }

    synchronize() {
        this.ngFireDatabase.list(`hour-control/${this.authenticationService.user.uid}`).push(this.storageService.store);
    }
}
