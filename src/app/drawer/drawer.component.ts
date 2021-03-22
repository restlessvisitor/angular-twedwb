import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { DrawerListener } from "../drawer-listener";
import { DrawerService } from "../drawer.service";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.css"]
})
export class DrawerComponent implements OnInit, DrawerListener {
  @ViewChild('drawer') private drawer: MatDrawer;

  constructor(private drawerService: DrawerService) {}

  ngOnInit() {
    this.drawerService.addDrawerListener(this);
  }

  toggleDrawer(): void {
    this.drawer.toggle();
    console.log("drawer", this.drawer.opened);
  }
}
