import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../auth.service";
import { DrawerService } from "../drawer.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SigninDialogComponent } from "./signin-dialog/signin-dialog.component";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.css"]
})
export class DrawerComponent implements OnInit {

  constructor(
    private drawer: DrawerService, 
    private auth: AuthService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
  }

  signIn() {
    // close drawer
    this.drawer.toggleDrawer();

    // show sign in dialog
    const dialogRef = this.dialog.open(SigninDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == "login") {
        //this.auth.signIn("email", "password");
      }
    });
  }

  register() {
    this.drawer.toggleDrawer();
  }
}
