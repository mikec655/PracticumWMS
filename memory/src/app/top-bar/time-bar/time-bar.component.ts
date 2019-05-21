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
      state('start', style({
        width: '0px'
      })),
      state('stop', style({
        width: '185px'
      })),
      // transition('open => closed', [
      //   animate('1s')
      // ]),
      transition('stop => start', [
        animate('2s')
      ]),
    ]),
  ],
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.css']
})


export class TimeBarComponent implements OnInit {
  isStarted:boolean = false;

  constructor(private timeService:TimeService) { 
    this.timeService.timeBarToggle.subscribe(time => this.toggle(time))
  }

  ngOnInit() { }

  toggle = (time:number) => {
    console.log("TOGGLE");
    this.isStarted = this.isStarted ? false : true
    if (this.isStarted) {
      setTimeout(this.toggle, time);
    }
  }

}
