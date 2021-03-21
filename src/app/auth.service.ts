import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase"

@Injectable()
export class AuthService {
  private credential: firebase.auth.UserCredential = null;

  constructor(private afAuth: AngularFireAuth) {
  }

  signInAnonymously() {
    this.afAuth.signInAnonymously().then((user) => {
      this.credential = user;
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.credential = null;
    });

  }

  getUser() {
    return this.credential;
  }

  getUserId() {
    return this.credential.user.uid;
  }
}