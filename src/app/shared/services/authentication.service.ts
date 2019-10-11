import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { User } from '../models/user.model';

@Injectable()
export class AuthenticationService {

    public user;

    constructor(
        private ngFireAuth: AngularFireAuth,
        private router: Router
    ) {
    }

    /**
     * Creates a new user in Firebase using email and password.
     */
    signUpToFirebase({ email, password }: User) {
        this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password).catch(error => {
            const { code, message } = error;
            alert(`[${code}] ${message}`);
        });
    }

    signInToFirebase({ email, password }: User) {
        this.ngFireAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
            const { code, message } = error;
            alert(`[${code}] ${message}`);
        });
    }

    public signInWithGoogleAuth() {
        this.router.navigate(['/callback']);
        this.ngFireAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    }

    public handleRedirect() {
        this.ngFireAuth.auth.getRedirectResult().then(result => {
            if (result.user && this.ngFireAuth.auth.currentUser) {
                this.user = this.ngFireAuth.auth.currentUser;
                this.router.navigate([`/home`]);
            }
        });
    }

    public signOut() {
        this.user = this.ngFireAuth.auth.currentUser;
        this.ngFireAuth.auth.signOut();
        this.router.navigate([`/login`]);
    }
}
