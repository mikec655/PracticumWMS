import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ColorService{

  private inactiveColor:string = "#FF0000";
  inactiveColorChange:Subject<string> = new Subject<string>();

  private activeColor:string = "#00FF00";
  activeColorChange:Subject<string> = new Subject<string>();
  
  private foundColor:string = "#FF00FF";
  foundColorChange:Subject<string> = new Subject<string>();

  constructor() { }

  getInactiveColor() : string {
    return this.inactiveColor
  }

  getActiveColor() : string {
    return this.activeColor
  }

  getFoundColor() : string {
    return this.foundColor
  }

  setInactiveColor(color:string) {
    this.inactiveColor = color;
    this.inactiveColorChange.next(color);
  }

  setActiveColor(color:string) {
    this.activeColor = color ;
    this.activeColorChange.next(color);
  }

  setFoundColor(color:string) {
    this.foundColor = color;
    this.foundColorChange.next(color);
  }
}
