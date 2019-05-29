import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColorService } from 'src/app/color.service';import { Subscription } from 'rxjs';
import { BoardService, CardData } from 'src/app/board.service';
;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private inactiveColor:string;
  private activeColor:string ;
  private foundColor:string;

  inactiveColorSubscription:Subscription;
  activeColorSubscription:Subscription;
  foundColorSubscription:Subscription;

  private isOpen:boolean = false; 
  private isFound:boolean = false;

  @Input() private char:string
  @Input() private data:CardData

  @Output() cardClicked: EventEmitter<string> = new EventEmitter();

  constructor(
    private colorService:ColorService, 
    private boardService:BoardService) { 

    this.inactiveColor = colorService.getInactiveColor();
    this.inactiveColorSubscription = colorService.inactiveColorChange.subscribe((color) => { 
      this.inactiveColor = color; 
    });

    this.activeColor = colorService.getActiveColor();
    this.activeColorSubscription = colorService.activeColorChange.subscribe((color) => { 
      this.activeColor = color; 
    });

    this.foundColor = colorService.getFoundColor();
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
    this.boardService.cardClicked(this.data);
    // if (this.isOpen) {
    //   this.isOpen = false;
    // } else {
    //   this.isOpen = true;
    // }
  }

}
