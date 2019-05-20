import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-settings',
  templateUrl: './color-settings.component.html',
  styleUrls: ['./color-settings.component.css']
})
export class ColorSettingsComponent implements OnInit {

  onColorChanged:EventEmitter<string> = new EventEmitter();
  onOpenColorChanged:EventEmitter<string> = new EventEmitter();
  onFoundColorChanged:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onColorChange(e:Event) {
    console.log((<HTMLInputElement>event.target).value);
    this.onColorChanged.emit((<HTMLInputElement>event.target).value);
  }

  onOpenColorChange(color:Event) {
    //this.onOpenColorChanged.emit(color);
  }

  onFoundColorChange(color:Event) {
    //this.onFoundColorChanged.emit(color);
  }

}
