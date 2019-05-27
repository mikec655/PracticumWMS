import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardData, BoardService } from '../board.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})

export class MemoryComponent {
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
