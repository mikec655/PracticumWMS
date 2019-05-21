import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService{
  private inactiveColor:string;
  inactiveColorChange:Subject<string> = new Subject<string>();
  private activeColor:string;
  activeColorChange:Subject<string> = new Subject<string>();
  private foundColor:string;
  foundColorChange:Subject<string> = new Subject<string>();

  constructor() { }

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
