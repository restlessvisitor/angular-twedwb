import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  private user: any = null;

  constructor(private afAuth: AngularFireAuth, private firebase: firebase) {
    this.firebase.auth().signInAnonymously().then((user: any) => {
      this.user = user;
    });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
