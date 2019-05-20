import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private isOpen:boolean = false; 
  color:string;
  @Input() private char:string
  @Input() private letter:string

  @Output() cardClicked: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onClick(e:Event) {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  setColor(color:string) {
    console.log("XXX");
    this.color = color;
  }

}
