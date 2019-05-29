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
  character:string;
  board:CardData[][]
  boardSubscription:Subscription
  characterSubscription:Subscription;
  
  constructor(private boardService:BoardService) {
    this.board = boardService.getBoard();
    this.boardSubscription = boardService.boardChange.subscribe(board => this.board = board);

    this.character = boardService.getCharacter();
    this.characterSubscription = boardService.characterChange.subscribe(c => this.character = c);
  }

}
