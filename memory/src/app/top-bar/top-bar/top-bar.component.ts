import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  foundPairs:number = 0;
  foundPairsSubscription:Subscription

  constructor(private boardService:BoardService) { 
    this.foundPairs = boardService.getFoundPairs();
    this.foundPairsSubscription = boardService.foundPairsChange.subscribe(n => { 
      this.foundPairs = n; 
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.foundPairsSubscription.unsubscribe();
  }

}
