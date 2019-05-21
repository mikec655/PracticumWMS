import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColorService } from 'src/app/color.service';
import { Subscription } from 'rxjs';
;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private inactiveColor:string = "#FF0000";
  private activeColor:string = "#00FF00";
  private foundColor:string = "#FF00FF";

  inactiveColorSubscription:Subscription;
  activeColorSubscription:Subscription;
  foundColorSubscription:Subscription;

  private isOpen:boolean = false; 
  private isFound:boolean = false;

  @Input() private char:string
  @Input() private letter:string

  @Output() cardClicked: EventEmitter<string> = new EventEmitter();

  constructor(private colorService:ColorService) { 
    
    this.inactiveColorSubscription = colorService.inactiveColorChange.subscribe((color) => { 
      this.inactiveColor = color; 
    });

    this.activeColorSubscription = colorService.activeColorChange.subscribe((color) => { 
      this.activeColor = color; 
    });

    this.foundColorSubscription = colorService.foundColorChange.subscribe((color) => { 
      this.foundColor = color; 
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.inactiveColorSubscription.unsubscribe();
    this.activeColorSubscription.unsubscribe();
    this.foundColorSubscription.unsubscribe();
  }

  onClick(e:Event) {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

}
