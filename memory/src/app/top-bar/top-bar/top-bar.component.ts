import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Subscription } from 'rxjs';
import { timeout } from 'q';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  foundPairs:number = 0
  foundPairsSubscription:Subscription

  time:number = 0
  timeChange:Subscription

  constructor(
    private boardService:BoardService,
    private timeService:TimeService) { 

    this.foundPairs = boardService.getFoundPairs();
    this.foundPairsSubscription = boardService.foundPairsChange.subscribe(n => { 
      this.foundPairs = n; 
    });

    this.timeChange = timeService.verlopenTijdChange.subscribe(time => this.time = time);
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.foundPairsSubscription.unsubscribe();
  }

}
