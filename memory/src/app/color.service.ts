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
    console.log("setInactiveColor");
  }

  setActiveColor(color:string) {
    this.activeColor = color ;
    this.activeColorChange.next(color);
    console.log("setActiveColor");
  }

  setFoundColor(color:string) {
    this.foundColor = color;
    this.foundColorChange.next(color);
    console.log("setFoundColor");
  }
}
