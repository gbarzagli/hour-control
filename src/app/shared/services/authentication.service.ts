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
        this.router.navigate(['/callback']);
        this.ngFireAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());

    }

    public handleRedirect() {
        this.ngFireAuth.auth.getRedirectResult().then(result => {
            if (result.user && this.ngFireAuth.auth.currentUser) {
                this.user = this.ngFireAuth.auth.currentUser;
                this.zone.run(() =>  this.router.navigate([`/home`]));
            }
        });
    }

    public signOut() {
        this.user = undefined;
        this.ngFireAuth.auth.signOut();
        this.router.navigate([`/login`]);
    }
}
