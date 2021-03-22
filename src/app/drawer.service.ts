import { Injectable } from "@angular/core";
import { DrawerListener } from "./drawer-listener";

@Injectable()
export class DrawerService {
  private listeners: DrawerListener[] = [];

  constructor() {}

  addDrawerListener(listener: DrawerListener) {
    this.listeners.push(listener);
  }

  toggleDrawer(): void {
    this.listeners.forEach(listener => listener.toggleDrawer());
  }
}
