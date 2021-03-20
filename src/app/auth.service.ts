import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()
export class AuthService {
  private user: any = null;

  constructor(private afAuth: AngularFireAuth) {
  }

  signInAnonymously() {
    this.afAuth.signInAnonymously().then((user) => {
      this.user = user;
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.user = null;
    });

  }

  getUser() {
    return this.user;
  }
}