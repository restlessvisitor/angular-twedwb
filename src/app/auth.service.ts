import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase"
import { AuthListener } from './auth-listener';

@Injectable()
export class AuthService {
  private credential: firebase.auth.UserCredential = null;
  private listeners: AuthListener[] = [];

  constructor(private afAuth: AngularFireAuth) {
  }
  
  addAuthListener(listener: AuthListener) {
    this.listeners.push(listener);
  }

  signInAnonymously() {
    this.afAuth.signInAnonymously().then((user) => {
      this.credential = user;
      this.listeners.forEach(listener => listener.notifyUserChanged(user));
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
  }

  signIn(email: string, pwd: string) : void {
    this.afAuth.signInWithEmailAndPassword(email, pwd).then((user) => {
      console.log("USER", user);
      this.credential = user;
      this.listeners.forEach(listener => listener.notifyUserChanged(user));
  
      var usr = firebase.auth().currentUser;

      usr.updateProfile({
        displayName: "Ralf Müller",
      }).then(function() {
        console.log("OK");
      }).catch(function(error) {
        console.log(error);
      });

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

  getUser() : firebase.auth.UserCredential {
    return this.credential;
  }

  getUserId() : string {
    return this.credential != null ? this.credential.user.uid : null;
  }
}