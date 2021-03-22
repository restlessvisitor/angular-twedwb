import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../auth.service";
import { DrawerService } from "../drawer.service";
import { MatDialog } from "@angular/material/dialog";
import { SigninDialogComponent } from "./signin-dialog/signin-dialog.component";
import { AuthListener } from "../auth-listener";
import firebase from "firebase";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.css"]
})
export class DrawerComponent implements OnInit, AuthListener {
  userCredential: firebase.auth.UserCredential;

  constructor(
    private drawer: DrawerService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.auth.addAuthListener(this);
  }

  signIn() {
    // close drawer
    this.drawer.toggleDrawer();

    // show sign in dialog
    const dialogRef = this.dialog.open(SigninDialogComponent);

    // sign user in
    dialogRef.afterClosed().subscribe(data => {
      if (data.result == "login") {
        this.auth.signIn(data.email, data.password);
      }
    });
  }

  notifyUserChanged(user: firebase.auth.UserCredential): void {
    this.userCredential = user;
    console.log("user", this.userCredential);
  }

  register() {
    this.drawer.toggleDrawer();
  }

  isAnonymous() : boolean {
    return this.userCredential != null ? this.userCredential.user.isAnonymous : true;
  }
}
