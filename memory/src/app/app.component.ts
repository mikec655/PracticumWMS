import { Component, Input } from '@angular/core';
import { BoardModule } from './board/board.module';
import { BoardService, CardData } from './board.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  char:string = "*"
  board:CardData[][]
  boardSubscription:Subscription
  
  constructor(private boardService:BoardService) {
    this.board = boardService.getBoard();
    this.boardSubscription = boardService.boardChange.subscribe(board => this.board = board)
  }

  updateChar(char:string) {
    console.log("CHAR");
    this.char = char;
  }

  
}
