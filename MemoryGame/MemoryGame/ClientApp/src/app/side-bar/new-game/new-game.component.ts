import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/time.service';
import { BoardService } from 'src/app/board.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  constructor(
    private boardService:BoardService,
    private timeService:TimeService) { }

  ngOnInit() { }

  onClick() {
    this.boardService.reset();
    this.timeService.reset();
  }

}
