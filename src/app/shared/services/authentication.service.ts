import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable()
export class AuthenticationService {

    public user;

    constructor(
        private ngFireAuth: AngularFireAuth,
        private router: Router,
        private zone: NgZone
    ) {
    }

    public signInWithGoogleAuth() {
        this.ngFireAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());

    }

    public handleRedirect() {
        this.ngFireAuth.auth.getRedirectResult().then(result => {
            if (result.user) {
                this.user = result.user;
                this.zone.run(() =>  this.router.navigate([`/home`]));
            }
        });
    }

    public signOut() {
        this.ngFireAuth.auth.signOut();
        this.router.navigate([`/login`]);
    }
}
