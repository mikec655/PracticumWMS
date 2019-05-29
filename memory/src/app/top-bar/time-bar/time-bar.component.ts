import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-time-bar',
  animations: [
    trigger('startStop', [
      state('left', style({ 'width': '185px' })),
      state('right', style({ 'width': '0px' })),
      transition('left => right', [
        animate(2000)
      ])
    ])
  ],
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.css']
})


export class TimeBarComponent implements OnInit {
  state:string = "left";
  lastTimeout:any

  constructor(private timeService:TimeService) { 
    this.timeService.timeBarToggle.subscribe(time => this.toggle(time))
  }

  ngOnInit() { }

  toggle = (time:number) => {
  
    clearTimeout(this.lastTimeout);
    this.stopAnimation();
    setTimeout(() => this.startAnimation(), 1);
    this.lastTimeout = setTimeout(() => this.stopAnimation(), time)
    
  }

  startAnimation() {
    this.state = "right";
  }

  stopAnimation() {
    this.state = "left"
  }

}
