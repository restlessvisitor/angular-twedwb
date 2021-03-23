import { Component, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./auth.service";
import { DrawerListener } from "./drawer-listener";
import { DrawerService } from "./drawer.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements DrawerListener {
  @ViewChild("drawer") private drawer: MatDrawer;

  constructor(
    private auth: AuthService,
    private drawerService: DrawerService
  ) {}

  ngOnInit() {
    this.drawerService.addDrawerListener(this);
    this.auth.signInAnonymously();
  }

  toggleDrawer(): void {
    this.drawer.toggle();
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
