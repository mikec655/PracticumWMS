import { Component, OnInit, EventEmitter } from '@angular/core';;
import { ColorService } from 'src/app/color.service';

@Component({
  selector: 'app-color-settings',
  templateUrl: './color-settings.component.html',
  styleUrls: ['./color-settings.component.css']
})
export class ColorSettingsComponent implements OnInit {

  constructor(private colorService:ColorService) { }

  ngOnInit() { }

  onColorChange(e:Event) {
    this.colorService.setInactiveColor((<HTMLInputElement>e.target).value);
  }

  onOpenColorChange(e:Event) {
    this.colorService.setActiveColor((<HTMLInputElement>e.target).value);
  }

  onFoundColorChange(e:Event) {
    this.colorService.setFoundColor((<HTMLInputElement>e.target).value);
  }

}
